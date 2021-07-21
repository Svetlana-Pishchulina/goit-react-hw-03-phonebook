import styles from "./ContactsListItem.module.css";

const ContactsListItem = ({ contacts, onDeleteButtonClick }) => {
  return contacts.map(({ id, name, number }) => (
    <li className={styles.listItem} key={id}>
      {name}:{number}
      <button className={styles.button} onClick={() => onDeleteButtonClick(id)}>
        Delete
      </button>
    </li>
  ));
};
export default ContactsListItem;
