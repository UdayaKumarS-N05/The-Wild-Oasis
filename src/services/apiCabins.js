import supabase from "./supabase";

export default async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function addCabin(newCabin) {
  const { data, error } = await supabase
    .from("cabins")
    .insert([{ some_column: "someValue", other_column: "otherValue" }])
    .select();
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be added :(");
  }
}

export async function deleteCabin(id) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    throw new Error("Cabin could not be deleted.");
  }
  return data;
}