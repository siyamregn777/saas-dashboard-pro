import { createClient } from '@/lib/supabase/server'

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status })
}

export async function GET() {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return jsonError('Authentication required.', 401)
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle()

  if (error) {
    return jsonError('Unable to load profile.', 500)
  }

  if (!profile) {
    return jsonError('Profile not found.', 404)
  }

  return Response.json({ profile })
}

export async function PATCH(request: Request) {
  const supabase = await createClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return jsonError('Authentication required.', 401)
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return jsonError('Request body must be valid JSON.', 400)
  }

  if (!body || typeof body !== 'object' || Array.isArray(body)) {
    return jsonError('Request body must be an object.', 400)
  }

  const input = body as Record<string, unknown>
  const updates: { full_name?: string; bio?: string; updated_at: string } = {
    updated_at: new Date().toISOString(),
  }

  if ('full_name' in input) {
    if (typeof input.full_name !== 'string' || input.full_name.trim().length > 100) {
      return jsonError('full_name must be a string of 100 characters or fewer.', 400)
    }
    updates.full_name = input.full_name.trim()
  }

  if ('bio' in input) {
    if (typeof input.bio !== 'string' || input.bio.length > 500) {
      return jsonError('bio must be a string of 500 characters or fewer.', 400)
    }
    updates.bio = input.bio.trim()
  }

  if (Object.keys(updates).length === 1) {
    return jsonError('Provide full_name or bio to update.', 400)
  }

  const { data: profile, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select('*')
    .maybeSingle()

  if (error) {
    return jsonError('Unable to update profile.', 500)
  }

  if (!profile) {
    return jsonError('Profile not found.', 404)
  }

  return Response.json({ profile })
}
