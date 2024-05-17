import { Button } from '@/components/ui/button'
import { useState, useEffect } from "react";
import { useAuth } from '@/components/AuthProvider';
import { jwtDecode } from 'jwt-decode';
import { Layout } from '@/components/ui/layout';
import api from "../api/axios";

export const HomePage = () => {
    
    const [user] = useAuth();
    const [jadwal, setJadwal] = useState([]);
    const [posts, setPosts] = useState([]);
    const [offers, setOffers] = useState([]);
    
    const fetchJadwal = async () => {
        const userData = jwtDecode(user.accessToken);
        try {
            const response = await api.get(`/jadwal-mahasiswa/user/${userData.id}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setJadwal(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const fetchPost = async () => {
        const userData = jwtDecode(user.accessToken);
        try {
            const response = await api.get(`/post/user/${userData.id}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setPosts(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }

    const fetchOffer = async () => {
        const userData = jwtDecode(user.accessToken);
        try {
            const response = await api.get(`/offer/user/${userData.id}`, {
                headers: {
                    Authorization: `Bearer ${user.accessToken}`
                }
            });
            setOffers(response.data);
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
    
    useEffect(() => {
        document.title = "KRSans"
        if (user.accessToken) {
            fetchJadwal();
            fetchOffer();
            fetchPost();
        }
    }, [user]);

    const test = () => {
        console.log(jadwal, posts, offers)
    }
    return (
        <Layout>
            <div className="flex justify-center px-20">
            <Button onClick={test}> Hello </Button>
            </div>
        </Layout>
    )
}
const Calendar = () => {
    const [currentEvents, setCurrentEvents] = useState([]);
  
    const handleDateClick = (selected) => {
      const title = prompt("Please enter a new title for your event");
      const calendarApi = selected.view.calendar;
      calendarApi.unselect();
  
      if (title) {
        calendarApi.addEvent({
          id: `${selected.dateStr}-${title}`,
          title,
          start: selected.startStr,
          end: selected.endStr,
          allDay: selected.allDay,
        });
      }
    };
}
