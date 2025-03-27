interface ProfileProps {
  profile: {
    id: number;
    name: string;
    school_id: string;
    address: string;
    date_of_birth: string;
    phone: string;
  };
}

const defaultProfile = {
  id: 0,
  name: '',
  school_id: '',
  address: '',
  date_of_birth: '',
  phone: ''
};

export default function Profile({ profile = defaultProfile }: ProfileProps) {
  return (
    <div className="border-1 p-4 rounded-lg shadow-md bg-gradient-to-t from-gray-700 to-gray-800 w-50 h-80 m-2 border-gray-400">
      <h2 className="text-2xl font-bold mb-2 text-white">{profile.name}</h2>
      <p className="text-white"><strong>School ID:</strong> {profile.school_id}</p>
      <p className="text-white"><strong>Date of Birth:</strong> {profile.date_of_birth}</p>
      <p className="text-white"><strong>Address:</strong> {profile.address}</p>
      <p className="text-gray-100"><strong>Phone:</strong> {profile.phone}</p>
    </div>
  );
}