export default function ({ store, redirect, app }) {
  const cookieStr = process.client ? document.cookie : app.context.req.headers.cookie
  if (!cookieStr) {
    redirect('/admin/login?message=login')
  }
}
