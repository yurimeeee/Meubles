import { css } from "styled-components";

interface FlexOptions {
  direction?: string;
  justify?: string;
  alignItem?: string;
}

export const baseWrapperStyles = css`
  width: 100%;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  font-family: PretendardRegular;
`;

export const flex = (obj: FlexOptions) => `
  display: flex;
  flex-direction: ${obj?.direction ?? "row"};
  justify-content: ${obj?.justify ?? "center"};
  align-items: ${obj?.alignItem ?? "center"};  
  `;
