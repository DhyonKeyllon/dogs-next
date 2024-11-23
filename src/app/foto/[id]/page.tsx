export default function FotoIdPage({ params }: { params: { id: number } }) {
  return (
    <main>
      <h1>Foto id: {params.id}</h1>
    </main>
  );
}
