"use client";
import "./globals.css";
import Profile from '../components/profile';  
import { supabase } from "../lib/supabase";
import { useState, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area"


interface Profile {
  id: number;
  name: string;
  school_id: string;
  address: string;
  date_of_birth: string;
  phone: string;
}

export default function Home() {
  const [data, setData] = useState<Profile>({
    id: 0,
    name: '',
    school_id: '',
    address: '',
    date_of_birth: '',
    phone: ''
  });
  
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const fetchData = async () => {
    try {
      const { data: profiles, error } = await supabase
        .from('users')
        .select('*');
      if (profiles) {
        setProfiles(profiles);
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const { data: supabaseData, error } = await supabase
        .from('users')
        .insert([
          { name: data.name, 
            school_id: data.school_id,
            address: data.address,
            date_of_birth: data.date_of_birth,
            phone: data.phone },
        ]);
      if (supabaseData) {
        console.log(supabaseData);
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
    fetchData();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileClick = (profile: Profile) => {
    setData(profile);
  };

  const handleDelete = async (id: number) => {
    try {
      const { data: supabaseData, error } = await supabase
        .from('users')
        .delete()
        .eq('id', id);
      if (supabaseData) {
        setProfiles(profiles.filter(profile => profile.id !== id));
        fetchData();
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
    fetchData();
  };

  const handleEdit = async (id: number) => 
  {
    try{          
          await supabase
          .from('users')
          .update({ name: data.name,
                    school_id: data.school_id,
                    address: data.address,
                    date_of_birth: data.date_of_birth,
                    phone: data.phone })
          .eq('id', id)
          .select();
    } catch (error) {
      console.log(error);
    }

    fetchData();
  }
  const [searchData, setSearchData] = useState<string>('');

  const handleSearch = async (search: string) => {
    try {
      const searchLower = search.toLowerCase();
      const { data: profiles, error } = await supabase
        .from('users')
        .select('*')
        .ilike('name', `%${searchLower}%`);
      if (profiles) {
        setProfiles(profiles);
      }
      if (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative bg-gray-800 h-150 w-250 rounded-xl p-4 shadow-lg shadow-neutral-400">
        <div className="flex flex-col items-start text-left space-y-4 mt-4">
            <h1 className="text-2xl ml-7 font-bold text-white">Enter Details</h1>
            <input className="input p-2 border border-gray-100 w-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Name" type="text" name="name" value={data?.name} onChange={handleChange}/>
            <input className="input p-2 border border-gray-100 w-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="School-ID" type="text" name="school_id" value={data?.school_id} onChange={handleChange}/>
            <input className="input p-2 border border-gray-100 w-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Date of Birth"type="text" name="date_of_birth" value={data?.date_of_birth} onChange={handleChange}/>
            <input className="input p-2 border border-gray-100 w-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Address" type="text" name="address" value={data?.address} onChange={handleChange}/>
            <input className="input p-2 border border-gray-100 w-50 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Contact Number" type="text" name="phone" value={data?.phone} onChange={handleChange}/>
            <button 
              className="bg-blue-700 text-white font-semibold py-2 px-4 w-50 rounded-md hover:bg-blue-600 active:bg-blue-800 transition-transform duration-300 ease-in-out shadow-md" 
              onClick={() => { 
                if (data.name && data.school_id && data.address && data.date_of_birth && data.phone) {
                  handleSubmit(); 
                  setData({ id: 0, name: '', school_id: '', address: '', date_of_birth: '', phone: '' });
                } else {
                  alert("Please fill in all fields before submitting.");
                }
              }}>
             SUBMIT
            </button>
        </div>
        <div className="absolute top-6 right-15 flex items-center space-x-2">
          <input className="p-2 border border-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white" placeholder="Search by name" value={searchData} onChange={(e) => { setSearchData(e.target.value); handleSearch(e.target.value); }}/>
          <button className="flex items-center space-x-2 p-2 bg-white rounded-md hover:bg-gray-300 active:scale-95 transition duration-300 ease-in-out " onClick={() => handleSearch(searchData)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
              </svg>
          </button>
        </div>
        <div className="absolute top-20 right-15">
            <ScrollArea className="w-170 h-105 bg-gray-800 rounded-xl border-1 border-gray-400">
            <div className="grid grid-cols-3 gap-1 p-2">
              {profiles.map((profile) => (
              <div key={profile.id} onClick={() => handleProfileClick(profile)}>
                <Profile profile={profile} />
              </div>
              ))}
            </div>
            </ScrollArea>
          </div>
        <div className="absolute bottom-6 left-150 transform -translate-x-1/2 flex items-center space-x-4">
            <button className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 active:bg-blue-800 transition-transform duration-300 ease-in-out shadow-md" onClick={() => { handleEdit(data.id); setData({ id: 0, name: '', school_id: '', address: '', date_of_birth: '', phone: '' });  }}>
            EDIT
            </button>
            <button className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 active:bg-blue-800 transition-transform duration-300 ease-in-out shadow-md" onClick={() => { handleDelete(data.id); }}>
            DELETE
            </button>
        </div>
      </div>
    </div>
  );
}
