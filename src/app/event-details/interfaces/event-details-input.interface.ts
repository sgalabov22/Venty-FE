import { CurrentUserData } from '@app/auth';

export interface EventInfo {
  id: number;
  event_title: string;
  start_date: string;
  end_date: string;
  description: string;
  location: string;
  event_owner: number;
}

export interface Guest {
  id: number;
  guest_user_account: GuestUserAccount;
  event: number;
  status: string;
}

export interface GuestUserAccount {
  fullname: string;
  email: string;
  id: number;
  profile_picture: string;
}

export interface GuestStatus {
  name: string;
  value: string;
}

export interface ExtensionsData {
  checklist: ChecklistItem[];
  reminder: ReminderItem[];
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface DragAndDropBoardItem {}

export interface ChecklistItem extends DragAndDropBoardItem {
  id?: number;
  name: string;
  event?: number;
  items: {
    id?: number;
    value: string;
    status?: boolean;
  }[];
  viewers?: CurrentUserData[];
}

export interface ReminderItem extends DragAndDropBoardItem {
  id?: number;
  name: string;
  scheduled: Date;
  email_body: string;
  event?: number;
  viewers?: CurrentUserData[];
}
