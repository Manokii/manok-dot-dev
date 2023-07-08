import { ImageResponse, type NextRequest } from "next/server"

export const runtime = "edge"

const interBold = fetch(
  new URL("../../../assets/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer())

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.nextUrl)

  const name = searchParams.get("name") ?? "Jasper Concepcion"
  const url = searchParams.get("url") ?? "Manok.dev"
  const headline =
    searchParams.get("subheadline") ?? "Sr. Software Engineer at AcadArena"
  const github = searchParams.get("github") ?? ""
  const linkedin = searchParams.get("linkedin") ?? ""
  const twitter = searchParams.get("twitter") ?? ""
  const website = searchParams.get("website") ?? ""

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "4rem",
          color: "white",
          backgroundColor: "#000",
          backgroundImage:
            "radial-gradient(circle at 25px 25px, #333 2%, transparent 0%), radial-gradient(circle at 100% 80%, rgba(255,255,255,0.1) 0%, transparent 100%)",
          backgroundSize: "50px 50px, 100% 100%",
        }}
      >
        <div
          style={{
            fontSize: 25,
            fontFamily: "Inter",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 5,
          }}
        >
          {url}
        </div>
        <div
          style={{
            fontWeight: 800,
            fontSize: 70,
            fontFamily: "Inter",
            width: 800,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 300,
            width: 800,
          }}
        >
          {headline
            .replaceAll("**", "")
            .replaceAll("__", "")
            .replaceAll("~~", "")
            .replaceAll(/\[(.*)\]\(.*\)/g, "$1")}
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "4rem",
            left: "4rem",
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {github && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 496 512"
                style={{ height: 30, width: 30 }}
                fill="#fff"
              >
                {/* Github Brand Icon */}
                <path d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" />
              </svg>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.5)" }}>
                {github.replace(new RegExp(/.*\.com\//), "").replace(/\/$/, "")}
              </div>
            </div>
          )}
          {linkedin && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Linkedin Brand Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
                style={{ height: 30, width: 30 }}
                fill="#fff"
              >
                <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
              </svg>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.5)" }}>
                {linkedin
                  .replace(new RegExp(/.*\.com\//), "")
                  .replace(/\/$/g, "")}
              </div>
            </div>
          )}

          {twitter && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* twitter Brand Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
                style={{ height: 30, width: 30 }}
                fill="#fff"
              >
                <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
              </svg>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.5)" }}>
                {twitter
                  .replace(new RegExp(/.*\.com\//), "")
                  .replace(/\/$/g, "")}
              </div>
            </div>
          )}
          {website && (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {/* Link Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 640 512"
                style={{ height: 30, width: 30 }}
                fill="#fff"
              >
                <path d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z" />
              </svg>
              <div style={{ fontSize: 20, color: "rgba(255,255,255,0.5)" }}>
                {website
                  .replace(new RegExp(/.*\.com\//), "")
                  .replace(/\/$/g, "")}
              </div>
            </div>
          )}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          weight: 800,
          data: await interBold,
        },
      ],
    }
  )
}
