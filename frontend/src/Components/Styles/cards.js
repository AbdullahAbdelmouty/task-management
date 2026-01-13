import styled from "styled-components";
import { Card } from "antd";

export const CardStatus = styled(Card)`
  border-radius: 12px;
  box-shadow: ${({ shadow }) =>
        shadow || "0px 6px 24px -2px rgba(69, 76, 67, 0.16)"};
  .ant-card-head-title {
    color: ${({ theme }) => theme.colors.primary};
  }
  .ant-card-body {
    padding: ${({ padding }) => padding || "24px"};
    display: ${({ display }) => display || "block"};
    justify-content: ${({ justify }) => justify || "flex-start"};
  }
`;