import { Flex } from 'antd';
import styled from 'styled-components';

export const ColumnWrapper = styled(Flex)`
  flex-direction: column;
  gap: 1rem;
  width: 320px;
  background: #ffff;
  border-radius: 16px;
  padding: 16px;
`;

export const ColumnHeader = styled.div`
  font-weight: 600;
  margin-bottom: 12px;
`;
