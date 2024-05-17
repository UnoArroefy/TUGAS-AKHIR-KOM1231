import { Button } from '@/components/ui/button'
<<<<<<< Updated upstream
import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useAuth } from '@/components/AuthProvider';
import { jwtDecode } from 'jwt-decode';
import { Layout } from '@/components/ui/layout';
import api from "../api/axios";
=======
import { useEffect } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { jwtDecode } from 'jwt-decode'
import { Layout } from '@/components/ui/layout'

>>>>>>> Stashed changes

export const HomePage = () => {
    
    const [user] = useAuth();
    const [jadwal, setJadwal] = useState([]);
    
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
    
    useEffect(() => {
        document.title = "KRSans"
        if (user.accessToken) {
            fetchJadwal();
        }
    }, [user]);
    const test = () => {
        console.log(jwtDecode(user.accessToken))
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
