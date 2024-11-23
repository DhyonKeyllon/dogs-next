export default function PerfilUserPage({
  params,
}: {
  params: { user: string };
}) {
  return (
    <main>
      <h1>{params.user}</h1>
    </main>
  );
}
