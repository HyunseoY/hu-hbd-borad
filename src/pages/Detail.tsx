import { Button, Input } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const Detail = () => {
  const [data, setData] = useState<{
    email: string;
    contents: string;
    isDeleted: boolean;
    id: number;
  }>({
    email: '',
    contents: '',
    isDeleted: false,
    id: 0,
  });

  const [comments, setComments] = useState('');
  const [temp, setTemp] = useState([]);

  const { id: itemId } = useParams();

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/boards?isDeleted=${false}&id=${itemId}`
      );
      const commentsResponse = await axios.get(
        `http://localhost:4000/comments?isDeleted=${false}&boardId=${itemId}`
      );

      setData(response.data[0]);
      setTemp(commentsResponse.data);
    } catch (error) {
      console.error(error);
      alert('일시적인 오류가 발생하였습니다. 고객센터로 연락주세요.');
      return false;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEnterButtonClick = async () => {
    try {
      await axios.post('http://localhost:4000/comments', {
        boardId: itemId,
        comments: comments,
        email: localStorage.getItem('email'),
        isDeleted: false,
      });

      window.location.reload();
    } catch (error) {
      return false;
    }
  };

  return (
    <MainWrapper>
      <h1>상세 페이지</h1>

      <ListWrapper>
        {data && (
          <div>
            <h3>작성자 : {data.email}</h3>
            <h3>내용 : {data.contents}</h3>
            {localStorage.getItem('email') === data.email && (
              <Button>삭제</Button>
            )}
          </div>
        )}
      </ListWrapper>
      <StyledInput
        placeholder="댓글을 입력해주세요."
        value={comments}
        onChange={(e: any) => {
          setComments(e.target.value);
        }}
      />
      {temp.map((comment: any) => {
        return <div key={comment.id}>{comment.comments}</div>;
      })}
      <Button onClick={handleEnterButtonClick}>댓글등록</Button>
    </MainWrapper>
  );
};

export default Detail;

const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListWrapper = styled.div`
  width: 50%;
  padding: 10px;
`;

const StyledInput = styled(Input)`
  width: 50%;
`;
