import { useSelector } from 'react-redux';
import styled from '@emotion/styled';
import { Watch } from 'react-loader-spinner';

import { ContactItem } from './ContactItem';
import s from './ContactList.module.css';

const WatchWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ContactList = ({ contacts: { data: contacts, isFetching, isError } }) => {
  const filterValue = useSelector(state => state.filter);

  return (
    <>
      {isFetching && (
        <WatchWrapper>
          <Watch color="#00BFFF" height={200} width={200} ariaLabel="loading" />
        </WatchWrapper>
      )}
      {!isFetching && !isError && contacts && (
        <ul className={s.list}>
          {contacts
            .filter(({ name }) =>
              name.toLowerCase().includes(filterValue.toLowerCase()),
            )
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(({ id, name, phone}) => {
              return <ContactItem contact={{ id, name, phone }} key={id} />;
            })}
        </ul>
      )}
      {isError && <h1>Data are not found</h1>}
    </>
  );
};

export default ContactList;