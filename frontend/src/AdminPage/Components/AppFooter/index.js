import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="AppFooter">
      <Typography.Link href="tel:+258 840011222">+258 840011222</Typography.Link>
      <Typography.Title level={5}>
      Centro de Saúde do Alto-Mãe 
      </Typography.Title>
      <Typography.Link href="https://www.google.com" target={"_blank"}>
        Termos de Uso
      </Typography.Link>
    </div>
  );
}
export default AppFooter;
