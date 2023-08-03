import { Button, Input } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Main: React.FC<any> = () => {
  const [data, setData] = useState([]);
  const [contents, setContents] = useState<string>('');

  const email = localStorage.getItem('email');

  const fetchData = async () => {
    try {
      // TODO: 데이터베이스에서 boards 리스트 가져오기
      const response = await axios.get('http://localhost:4000/boards');
      // TODO: 가져온 결과 배열을 data state에 set 하기
      setData(response.data);
    } catch (error) {
      // TODO: 네트워크 등 기타 문제인 경우, "일시적인 오류가 발생하였습니다. 고객센터로 연락주세요." alert
      alert('일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.');
      return false;
    }
  };

  useEffect(() => {
    // TODO: 해당 useEffect는 최초 마운트시에만 동작하게 제어
    fetchData();
  }, []);

  const handleBoardSubmit = async (e: any) => {
    // TODO: 자동 새로고침 방지
    e.preventDefault();
    try {
      // TODO: 이메일과 contents를 이용하여 post 요청 등록(isDeleted 기본값은 false)
      await axios.post(`http://localhost:4000/boards`, {
        email,
        contents,
        isDeleted: false,
      });
    } catch (error) {
      // TODO: 네트워크 등 기타 문제인 경우, "일시적인 오류가 발생하였습니다. 고객센터로 연락주세요." alert
      alert('일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.');
      return false;
    }
    // TODO: 성공한 경우, "작성이 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다." alert
    alert(
      '작성이 완료되었습니다. 아직 자동 새로고침이 불가하여 수동으로 갱신합니다.'
    );
    // TODO: 처리완료 후, reload를 이용하여 새로고침
    window.location.reload();
    // fetchData();
  };

  const handleInputChange = (e: any) => {
    setContents(e.target.value);
  };

  const onClickDelete = async (itemId: number) => {
    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:4000/boards/${itemId}`);
        fetchData();
      } catch (error) {
        alert('일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.');
      }
    }
  };

  return (
    <MainWrapper>
      <h1>메인 리스트 페이지</h1>
      <StyledForm onSubmit={handleBoardSubmit}>
        <StyledInput
          placeholder="방명록을 입력해주세요."
          value={contents}
          onChange={handleInputChange}
        />
      </StyledForm>
      <ListWrapper>
        {data.map((item: any, index) => (
          <ListItem key={item.id}>
            <span>
              {index + 1}. {item.contents}
            </span>
            {/* // TODO: 로그인 한 user의 이메일과 일치하는 경우에만 삭제버튼 보이도록 제어 */}
            {email === item.email && (
              <Button onClick={() => onClickDelete(item.id)}>삭제</Button>
            )}
          </ListItem>
        ))}
      </ListWrapper>
    </MainWrapper>
  );
};

export default Main;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListWrapper = styled.div`
  width: 50%;
  padding: 10px;
`;

const ListItem = styled.div`
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled(Input)`
  width: 50%;
`;

const StyledForm = styled.form`
  width: 100%;
  text-align: center;
`;
