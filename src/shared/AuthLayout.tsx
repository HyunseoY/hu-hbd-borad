import { Button } from 'antd';
import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const AuthLayout = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   // TODO: localStorage의 토큰 검색
  //   const searchToken = localStorage.getItem('token');

  //   // TODO: localStorage의 이메일 검색
  //   const searchEmail = localStorage.getItem('email');

  //   // TODO: 토큰 또는 이메일 중 하나라도 없을 경우 "토큰 또는 이메일이 없습니다. 로그인해주세요." alert
  //   if (searchToken === null || searchEmail === null) {
  //     alert('토큰 또는 이메일이 없습니다. 로그인해주세요.');

  //     // TODO: localStorage에 있는 token, email을 제거 => 여기서 제거해줄 필요는 없지 않나?
  //     localStorage.removeItem('token');
  //     localStorage.removeItem('email');
  //     // localStorage.clear()

  //     // TODO: "/auth"로 이동
  //     navigate('/auth');
  //   }
  // }, [navigate]);

  useEffect(() => {
    console.log('mount' + new Date().valueOf());
    const timeout = setTimeout(() => {
      // TODO: localStorage의 토큰 검색
      const searchToken = localStorage.getItem('token');
      // TODO: localStorage의 이메일 검색
      const searchEmail = localStorage.getItem('email');
      // TODO: 토큰 또는 이메일 중 하나라도 없을 경우 "토큰 또는 이메일이 없습니다. 로그인해주세요." alert
      if (searchToken === null || searchEmail === null) {
        alert('토큰 또는 이메일이 없습니다. 로그인해주세요.');
        // TODO: localStorage에 있는 token, email을 제거 => 여기서 제거해줄 필요는 없지 않나?
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        // localStorage.clear()
        // TODO: "/auth"로 이동
        navigate('/auth');
      }
    }, 0);
    return () => {
      console.log('unmount' + new Date().valueOf());
      clearTimeout(timeout);
    };
  }, []);

  const handleLogoutButtonClick = () => {
    // TODO: "로그아웃 하시겠습니까?" confirm
    const confirmed = window.confirm('로그아웃 하시겠습니까?');

    if (confirmed) {
      // TODO: yes 선택 시, localStorage의 token과 email 제거
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      // localStorage.clear()

      // TODO: "로그아웃이 완료되었습니다" alert
      alert('로그아웃이 완료되었습니다');

      // TODO: "/auth"로 이동
      navigate('/auth');
    }
  };

  return (
    <>
      <StyledHeaderBox>
        <Button onClick={handleLogoutButtonClick}>로그아웃</Button>
      </StyledHeaderBox>
      <Outlet />
    </>
  );
};

export default AuthLayout;

const StyledHeaderBox = styled.div`
  display: flex;
  justify-content: right;
  padding: 10px;
`;
