import "@/design-system/portfolio-app.css";
import "./v2.css";

export default function V2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="portfolio-v2">{children}</div>;
}
