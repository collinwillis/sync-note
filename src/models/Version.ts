import firebase from 'firebase/compat/app';

export interface Version {
  id: string;
  content: string;
  timestamp: firebase.firestore.Timestamp;
}
