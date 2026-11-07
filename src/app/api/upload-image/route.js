import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    return Response.json({ error: "Sign in to upload a book image." }, { status: 401 });
  }

  const apiKey =
    process.env.IMGBB_API_KEY || process.env.NEXT_PUBLIC_IMGBB_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "Image upload is not configured on the server." },
      { status: 500 }
    );
  }

  const formData = await request.formData();
  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    return Response.json({ error: "Please choose an image to upload." }, { status: 400 });
  }

  const uploadData = new FormData();
  uploadData.append("image", image);

  try {
    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${encodeURIComponent(apiKey)}`,
      { method: "POST", body: uploadData, cache: "no-store" }
    );
    const result = await response.json();

    if (!response.ok || !result?.data?.url) {
      console.error("ImgBB rejected image upload:", {
        status: response.status,
        error: result?.error?.message,
      });
      return Response.json(
        {
          error:
            response.status === 403
              ? "ImgBB rejected the API key or access. Create a new ImgBB API key and update IMGBB_API_KEY in the server environment."
              : result?.error?.message || "ImgBB image upload failed.",
        },
        { status: 502 }
      );
    }

    return Response.json({ url: result.data.url });
  } catch (error) {
    console.error("Could not reach ImgBB:", error);
    return Response.json(
      { error: "Could not connect to ImgBB. Please try again." },
      { status: 502 }
    );
  }
}
