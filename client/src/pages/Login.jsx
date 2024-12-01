import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { useState } from "react";

const Login = () => {
  const [signupInput, setSignupInput] = useState({name:"", email:"", password:""})
  const [loginInput, setLoginInput] = useState({email:"", password:""})

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    // console.log(e);
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };

  const handleRegistration = (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    // console.log(inputData)
  };

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="signup">Signup</TabsTrigger>
        <TabsTrigger value="login">Login</TabsTrigger>
      </TabsList>
      <TabsContent value="signup">
        <Card>
          <CardHeader>
            <CardTitle>Signup</CardTitle>
            <CardDescription>
              Please fill the details to Create your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={signupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="Nagmani Kumar"
                  required="true"
                />
            </div>
            <div className="space-y-1">
              <Label htmlFor="username">Email</Label>
              <Input
              type="email"
              name= "email"
              value= {signupInput.email}
              onChange={(e) => changeInputHandler(e, "signup")}
              placeholder="nag2mani@gmail.com"
              required="true"
              />
            </div>
            <div className="space-y-1">
              <Label >Password</Label>
              <Input
                  type="password"
                  name="password"
                  value={signupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required="true"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick = {() => handleRegistration("signup")} >Signup</Button>
          </CardFooter>
        </Card>
      </TabsContent>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Login Into Your Account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <div className="space-y-1">
              <Label htmlFor="username">Email</Label>
              <Input
              type="email"
              name= "email"
              value= {loginInput.email}
              onChange={(e) => changeInputHandler(e, "login")}
              placeholder="nag2mani@gmail.com"
              required="true"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">Password</Label>
              <Input
                  type="password"
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  required="true"
                />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick = {() => handleRegistration("login")}>Login</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default Login