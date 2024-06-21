import supabase, { supabaseUrl } from "./supabase";

export default async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function addCabin(newCabin) {
  // https://ninwhcbjvysuxxowfvvq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  // https://ninwhcbjvysuxxowfvvq.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  // const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // const imagePath = `/cabin-images/${imageName}`;
  // 1. Create the cabin
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ ...newCabin, image: imagePath }])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be added :(");
  }

  // 2. Upload the image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", newCabin.id);
    console.log(storageError);
    throw new Error("Image could not be added , cabin not added :(");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted.");
  }
  return data;
}
