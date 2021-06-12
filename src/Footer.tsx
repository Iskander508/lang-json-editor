import React, { useMemo } from "react";
import styled from "styled-components";

export default function Footer() {
  const year = useMemo(() => new Date().getFullYear(), []);
  return <Container>{`© Pavel Zarecky, ${year}`}</Container>;
}

const Container = styled.div`
  padding-right: 15px;
  text-align: end;
`;
