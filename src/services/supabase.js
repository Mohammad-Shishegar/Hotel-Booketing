import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://cvardoljmvjetjzfpfdp.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2YXJkb2xqbXZqZXRqemZwZmRwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYxODczODksImV4cCI6MjAyMTc2MzM4OX0.-ahxA5rDk3UiV7RHYS6_BKGZsveHBVN9c5XFA9drfoY"
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase