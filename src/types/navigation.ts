import { User } from '../../App';

export type TabParamList = {
  CourtsTab: {
    user: User;
    fromAddCourt?: boolean;
  };
  HomeTab: {
    user: User;
  };
  ProfileTab: {
    user: User;
  };
}; 