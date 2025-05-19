"use client"

import { useState, useEffect } from "react"
import { format, parse, isAfter, isBefore, isEqual } from "date-fns"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import {
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box,
  Alert,
} from "@mui/material"

// Generate time options in 30-minute increments
const generateTimeOptions = () => {
  const options = []
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, "0")
    options.push(`${hour}:00`)
  }
  return options
}
const getFormatedTime = (fullTime) => {
  const date = new Date(`1970-01-01T${fullTime}`)
  const shortTime = date.getHours() + ":" + date.getMinutes().toString().padStart(2, "0")
  return shortTime
}
const timeOptions = generateTimeOptions()

export default function TimeSlotSelector({
  startTime,
  endTime,
  hireNow,
  setAdditionalNotes,
  additionalNotes,
  slotStartTime,
  setSlotStartTime,
  slotEndTime,
  setSlotEndTime,
  slotUnavailable,
  setSlotUnavailable,
}) {
  const [overallStartTime, setOverallStartTime] = useState(getFormatedTime(startTime)) // Default 4:00 PM
  const [overallEndTime, setOverallEndTime] = useState(getFormatedTime(endTime)) // Default 7:00 PM
  const [error, setError] = useState(null)
  const [validSlot, setValidSlot] = useState(false)

  // Filter time options based on overall range
  const getFilteredStartOptions = () => {
    const start = parse(overallStartTime, "HH:mm", new Date())
    const end = parse(overallEndTime, "HH:mm", new Date())

    return timeOptions.filter((time) => {
      const timeDate = parse(time, "HH:mm", new Date())
      return (isEqual(timeDate, start) || isAfter(timeDate, start)) && isBefore(timeDate, end)
    })
  }

  // Get filtered end time options that are at least 1 hour after start time
  const getFilteredEndOptions = () => {
    if (!slotStartTime) return []

    const start = parse(slotStartTime, "HH:mm", new Date())
    const end = parse(overallEndTime, "HH:mm", new Date())
    const minEndTime = new Date(start.getTime() + 60 * 60 * 1000) // 1 hour after start

    return timeOptions.filter((time) => {
      const timeDate = parse(time, "HH:mm", new Date())
      return (
        (isAfter(timeDate, minEndTime) || isEqual(timeDate, minEndTime)) &&
        (isBefore(timeDate, end) || isEqual(timeDate, end))
      )
    })
  }

  // Validate the overall time range
  useEffect(() => {
    const start = parse(overallStartTime, "HH:mm", new Date())
    const end = parse(overallEndTime, "HH:mm", new Date())

    if (isEqual(start, end) || isAfter(start, end)) {
      setError("End time must be after start time")
    } else {
      setError(null)
      // Reset slot selection when overall range changes
      setSlotStartTime("")
      setSlotEndTime("")
      setValidSlot(false)
    }
  }, [overallStartTime, overallEndTime])

  useEffect(() => {
    if (slotStartTime && slotEndTime) {
      const slotStart = parse(slotStartTime, "HH:mm", new Date())
      const slotEnd = parse(slotEndTime, "HH:mm", new Date())

      // Calculate time difference in minutes
      const diffInMinutes = (slotEnd.getTime() - slotStart.getTime()) / (1000 * 60)

      if (isEqual(slotStart, slotEnd) || isAfter(slotStart, slotEnd)) {
        setError("Slot end time must be after slot start time")
        setValidSlot(false)
      } else if (diffInMinutes < 60) {
        setError("Slot must be at least 1 hour long")
        setValidSlot(false)
      } else {
        setError(null)
        setValidSlot(true)
      }
    } else {
      setValidSlot(false)
    }
  }, [slotStartTime, slotEndTime])

  const formatTimeForDisplay = (time) => {
    if (!time) return ""
    const date = parse(time, "HH:mm", new Date())
    return format(date, "h:mm a") // Format as 4:00 PM
  }

  const handleSlotStartChange = (event) => {
    setSlotUnavailable("")
    const value = event.target.value // This is in 24-hour format (HH:mm)
    setSlotStartTime(value)

    // Reset end time if it's now invalid
    const start = parse(value, "HH:mm", new Date())
    if (slotEndTime) {
      const end = parse(slotEndTime, "HH:mm", new Date())
      if (isEqual(start, end) || isAfter(start, end)) {
        setSlotEndTime("")
      }
    }
  }

  const handleSlotEndChange = (event) => {
    const value = event.target.value // This is in 24-hour format (HH:mm)
    setSlotEndTime(value)
  }

  return (
    <Card elevation={0}>
      <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {!error && (
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small" disabled={!!error}>
                  <InputLabel id="slot-start-time-label">From</InputLabel>
                  <Select
                    labelId="slot-start-time-label"
                    id="slot-start-time"
                    value={slotStartTime}
                    label="From"
                    onChange={handleSlotStartChange}
                  >
                    {getFilteredStartOptions().map((time) => (
                      <MenuItem key={`slot-start-${time}`} value={time}>
                        {formatTimeForDisplay(time)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small" disabled={!slotStartTime || !!error}>
                  <InputLabel id="slot-end-time-label">To</InputLabel>
                  <Select
                    labelId="slot-end-time-label"
                    id="slot-end-time"
                    value={slotEndTime}
                    label="To"
                    onChange={handleSlotEndChange}
                  >
                    {getFilteredEndOptions().map((time) => (
                      <MenuItem key={`slot-end-${time}`} value={time}>
                        {formatTimeForDisplay(time)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
        )}

        {validSlot && (
          <Box sx={{ pt: 2, mb: 8, borderTop: 1, borderColor: "divider" }}>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 500 }}>
              Selected Slot:
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1.5,
                bgcolor: "#e1f3e2", // light shade of #036905
                color: "#036905",
                borderRadius: 1,
              }}
            >
              <AccessTimeIcon sx={{ mr: 1, color: "#036905" }} />
              <Typography fontWeight={500}>
                {formatTimeForDisplay(slotStartTime)} - {formatTimeForDisplay(slotEndTime)}
              </Typography>
            </Box>
            <TextField
              label="Additional Notes"
              name="additional_notes"
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              multiline
              rows={3}
              fullWidth
              variant="outlined"
              sx={{ mt: 3 }} // adds margin-top
            />
            <button
              type="submit"
              className="btn btn-black btn-block mt-20"
              onClick={() =>
                hireNow({
                  startTime: formatTimeForDisplay(slotStartTime),
                  endTime: formatTimeForDisplay(slotEndTime),
                })
              }
            >
              Hire Now
            </button>
            {slotUnavailable && (
              <Alert className="mt-4" severity="error">
                {slotUnavailable}
              </Alert>
            )}
          </Box>
        )}
      </CardContent>
    </Card>
  )
}
