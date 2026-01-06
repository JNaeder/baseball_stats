export default async function page({
  params,
}: {
  params: Promise<{ teamId: number }>;
}) {
  const teamId = (await params).teamId;
  return <div>{teamId}</div>;
}
