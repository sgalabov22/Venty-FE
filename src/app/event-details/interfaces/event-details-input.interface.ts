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

export interface ReminderItem {
  name: string;
  scheduled: string;
  email_body: string;
}

export interface ChecklistItem {
  id?: number;
  name: string;
  event?: number;
  items: {
    id?: number;
    value: string;
    status?: boolean;
  }[];
  viewers?: Viewer[];
}

export interface Viewer {
  id: number;
  fullname: string;
  email: string;
  profile_picture: string;
}
