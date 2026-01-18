import styled from "styled-components";
import { Card } from "antd";

export const TaskCardStyle = styled(Card)`
  background-color: ${({ theme }) => theme.colors.taskCardBg};
`;