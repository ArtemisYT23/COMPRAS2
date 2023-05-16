import styled from "styled-components";
import { ContainerHeader } from "../../Styles/Form";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import fondoComex from "../../../assets/Fondos/fondoComex.png";
import fondoCentral from "../../../assets/Fondos/fondoCentral.png";
import LogoComex from "../../../assets/Img/LogoComex.png";
import LogoCentral from "../../../assets/Img/LogoCentral.png";

const Header = () => {
  const r = document.querySelector(":root");
  const { documentary } = useSelector((store) => store);
  const { DocumentInfo } = documentary;

  useEffect(() => {
    // console.log(DocumentInfo)
    DocumentInfo.forEach((doc, i) => {
      if (doc.indexCode == 31) {
        doc.metadataValue === "COMEXPORT_S.A."
          ? (r.style.setProperty("--PrimaryColor", "#4c607f"),
            (document.body.style.backgroundImage = `url('${fondoComex}')`))
          : (r.style.setProperty("--PrimaryColor", "#F68A20"),
            (document.body.style.backgroundImage = `url('${fondoCentral}')`));
      }
    });
  }, [DocumentInfo]);

  return (
    <ContainerHeader>
      <Content>
        <Title>
          {!DocumentInfo ||DocumentInfo[0]?.metadataValue === "COMEXPORT_S.A." ? (
            <FooterImage src={LogoComex} />
          ) : (
            <FooterImage src={LogoCentral} />
          )}
        </Title>
      </Content>
    </ContainerHeader>
  );
};

export default Header;

const Content = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 767px) {
    display: flex;
    padding: 0;
  }
`;

export const Title = styled.h1`
  text-align: center;
  width: 90%;
  margin-bottom: 1rem;
  border-bottom: 4px solid var(--PrimaryColor);
`;

export const FooterImage = styled.img`
  width: 100%;
  &:first-child {
    margin-bottom: 1rem;
  }
  @media screen and (min-width: 720px) {
    width: initial;
    height: 5.5rem;
    &:first-child {
      margin-bottom: 0;
    }
  }
`;
