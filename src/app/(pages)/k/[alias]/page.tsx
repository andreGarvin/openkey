export default async function Page({
  params,
}: {
  params: Promise<{ alias: string }>;
}) {
  const { alias } = await params;
  return <div>alias: {alias}</div>;
}
