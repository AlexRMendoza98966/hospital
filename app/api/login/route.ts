import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  // Busca el usuario por correo y contrasena
  const result = await pool.query(
    'SELECT id, nombre_completo, correo, rol, estado FROM usuarios WHERE correo = $1 AND contrasena = $2',
    [email, password]
  );

  if (result.rows.length > 0) {
    return NextResponse.json({ success: true, user: result.rows[0] });
  } else {
    return NextResponse.json({ success: false, error: 'Credenciales inválidas' }, { status: 401 });
  }
}
