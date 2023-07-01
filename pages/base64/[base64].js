import { useRouter } from "next/router";

function Base64DecodeUrl(base64) {
  if (base64) {
    const decodedCode = Buffer.from(base64, "base64").toString("utf-8");
    console.log("base64: " + typeof base64);
    console.log("decodedCode: " + decodedCode);
    return decodedCode;
  }
  return null; // or any default value you prefer
}

export default function Page() {
  const router = useRouter();
  const base64Code = router.query.base64;

  if (!base64Code) {
    // Handle the case when base64Code is undefined
    return <div>Base64 Code is missing or undefined.</div>;
  }

  const decodedCode = Base64DecodeUrl(base64Code);

  return (
    <div>
      <div>Base64 Code: {base64Code}</div>
      <div>Decoded Code: {decodedCode}</div>
    </div>
  );
}
