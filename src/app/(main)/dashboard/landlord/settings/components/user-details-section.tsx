import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '../../../../../../components/ui/avatar';
import { User } from '../../../../../../types/auth';
import { RoleDisplayName } from '../../../../../../types/user';

const UserDetailsSection = ({ user }: { user: User }) => {
  return (
    <div className="w-full">
      <div className="flex flex-row items-center gap-5">
        <Avatar className="w-24 h-24">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="flex flex-col">
          <span className="text-xl font-bold text-blue-900">
            {user.firstName} {user.lastName}
          </span>
          <span className="text-lg">{RoleDisplayName[user.role]}</span>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsSection;
