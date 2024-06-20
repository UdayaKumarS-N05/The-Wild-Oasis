import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://ninwhcbjvysuxxowfvvq.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5pbndoY2JqdnlzdXh4b3dmdnZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg4MDQxNTcsImV4cCI6MjAzNDM4MDE1N30.20XIpkiBg4Mw6F-5kJo5ZdMqZaMEMXvPdIys8TkWBF8";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
