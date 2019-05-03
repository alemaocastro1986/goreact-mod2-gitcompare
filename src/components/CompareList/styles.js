import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  margin-top: 50px;
`;

export const Repository = styled.div`
  width: 250px;
  background-color: #fff;
  border-radius: 3px;

  display: flex;
  flex-direction: column;

  margin: 0 10px;

  header {
    padding: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      height: 64px;
      width: 64px;
    }

    strong {
      font-size: 24px;
      margin-top: 10px;
    }
    small {
      font-size: 14px;
      color: #666;
    }
  }

  ul {
    list-style: none;
    li {
      font-weight: bold;
      padding: 12px 20px;
      i {
        margin-right: 5px;
      }
      small {
        font-weight: normal;
        font-size: 12px;
        color: #999;
        font-style: italic;
      }

      &:nth-child(2n -1) {
        background: #f5f5f5;
      }
    }
  }

  div.actions {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;

    button {
      height: 35px;
      width: 100px;
      border: 2px solid;
      border-radius: 6px;
      font-size: 14px;
      background: #fff;
    }

    button.danger {
      border-color: #cc3300;
      color: #cc3300;

      &:hover {
        background: #cc3300;
        color: #fff;
      }
    }

    button.primary {
      border-color: #0077b3;
      color: #0077b3;

      &:hover {
        background: #0077b3;
        color: #fff;
      }
    }
  }
`;
