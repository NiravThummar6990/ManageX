import PageHeader from "@/components/dashboard/PageHeader"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Sun, Moon, Bell, User, Backpack } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function Setting() {
  // Example settings state
  const [darkMode, setDarkMode] = useState(false)
  const [emailNotif, setEmailNotif] = useState(true)
  const [userName, setUserName] = useState("Nirav Thummar")
  const [email, setEmail] = useState("niravthummar4129@gmail.com")

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    // Save logic here (maybe API)
    alert("Profile updated!")
  }

  const navigate = useNavigate()

  return (
    <>
      <div className="mx-auto flex max-w-full justify-center px-2 md:max-w-[760px] md:px-0">
        <PageHeader
          icon={<User />}
          title="User Settings"
          description="Manage your preferences, account profile, and notification settings."
        />
        <Button
          variant={"link"}
          onClick={() => navigate("/dashboard")}
          className="text-md mx-2 my-4"
        >
          &lt; back
        </Button>
      </div>
      {/* Responsive grid: full width on mobile, max-w-2xl on larger screens */}
      <div className="xs:px-2 mx-auto grid w-full max-w-full gap-4 px-2 sm:px-4 md:max-w-[730px] md:px-0">
        {/* Profile Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              Profile
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor="username">Name</Label>
                <Input
                  id="username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  autoComplete="off"
                  className="w-full"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="off"
                  className="w-full"
                />
              </div>
              <Button type="submit" className="mt-2 w-full sm:w-auto">
                Save Changes
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Appearance Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="xs:flex-row xs:items-center xs:gap-4 flex flex-col items-start gap-2">
              <Label htmlFor="darkmode" className="flex items-center gap-2">
                <Moon className="h-4 w-4 text-muted-foreground" />
                Enable Dark Mode
              </Label>
              <Switch
                id="darkmode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
                className="xs:mt-0 mt-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Notifications Card */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-500" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="xs:flex-row xs:items-center xs:gap-4 flex flex-col items-start gap-2">
              <Label htmlFor="notif" className="flex items-center gap-2">
                Email notifications
              </Label>
              <Switch
                id="notif"
                checked={emailNotif}
                onCheckedChange={setEmailNotif}
                className="xs:mt-0 mt-1"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
