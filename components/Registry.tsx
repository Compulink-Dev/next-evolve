"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Colors } from "@/constant/colors";
import Link from "next/link";
import { countries } from "@/constant/data";

type LoginProps = {
  firstName: string;
  lastName: string;
  jobTitle: string;
  company: string;
  phoneNumber: string;
  country: string;
  state: string;
  email: string;
  industry: string;
  function: string;
  position: string;
  companySize: string;
  confirmPassword: string;
  password: string;
};

function RegistryForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [position, setPosition] = useState("");
  const [companySize, setCompanySize] = useState("");




  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // if (
      //   !firstName ||
      //   !lastName ||
      //   !jobTitle ||
      //   !company ||
      //   !phoneNumber ||
      //   !country ||
      //   !state ||
      //   !email ||
      //   !industry ||
      //   !position ||
      //   !companySize
      // ) {
      //   toast.warn("Fill all the fields ");
      // }
      const res = await fetch(`/api/registration `, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          jobTitle,
          company,
          phoneNumber,
          country,
          state,
          email,
          industry,
          position,
          companySize,
        }),
      });
      if (res.ok) {
        toast.success("Registration Successful");
        setFirstName("")
        setLastName("")
        setJobTitle("")
        setCompany("")
        setPhoneNumber("")
        setCountry("")
        setState("")
        setEmail("")
        setIndustry("")
        setPosition("")
        setCompanySize("")
      }
    } catch (error) {
      toast.error("Unable to register");
    }
  };
  return (
    <div className="border rounded flex flex-col md:flex-row  gap-8 m-8">
      <div className="flex items-center justify-center bg-white px-8 py-8 md:py-0">
        <Image src={"/home/logo.png"} width={200} height={200} alt="logo" />
      </div>
      <div className="p-8 text-white placeholder:text-white">
        <div className="">
          <p className="my-8 font-bold text-2xl">Create Account</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="flex gap-6 w-full placeholder:text-white">
            <div className="grid gap-2">
              <label className="text-sm font-bold">First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                name="name"
                placeholder="Enter first name"
                className="text-black p-2 text-sm rounded-lg w-full"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-bold">Last Name</label>
              <input
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter last name"
                name="surname"
                className="text-black p-2 text-sm rounded-lg w-full"
              />
            </div>
          </div>
          <div className="flex gap-6 w-full placeholder:text-white">
            <div className="grid gap-2">
              <label className="text-sm font-bold">Job Title</label>
              <input
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                name="job"
                placeholder="Enter Job Title"
                className="text-black p-2 text-sm rounded-lg w-full"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-bold">Company Name</label>
              <input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                name="company"
                placeholder="Enter company name"
                className="text-black p-2 text-sm rounded-lg w-full"
              />
            </div>
          </div>
          <div className="flex gap-6 w-full placeholder:text-white">
            <div className="grid gap-2">
              <label className="text-sm font-bold">Email</label>
              <input
                value={email}
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="text-black p-2 text-sm rounded-lg w-full"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-bold">Phone Number</label>
              <input
                value={phoneNumber}
                name="phone"
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter your phone number"
                className="text-black p-2 text-sm rounded-lg w-full"
              />
            </div>
          </div>
          <div className="flex gap-6 w-full placeholder:text-white">
            <div className="grid gap-2">
              <label className="text-sm font-bold">Country/Region</label>
              {/* <input
                value={country}
                name="country"
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country/Region"
                className="text-black p-2 text-sm rounded-lg w-full"
              /> */}
              <select
                //@ts-ignore
                value={country}
                onChange={((e) => {
                  setCountry(e.target.value)
                })}
                className="text-black p-2 text-sm rounded-lg w-full">

                {
                  countries.map((country) => (

                    <option key={country.name} value={country.name}>{country.name}</option>

                  ))
                }
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-bold">State/Province</label>
              <input
                value={state}
                name="province"
                onChange={(e) => setState(e.target.value)}
                placeholder="State/Province"
                className="text-black p-2 text-sm rounded-lg w-full"
              />
            </div>
          </div>
          <div className="flex gap-6 w-full placeholder:text-white">
            <div className="grid gap-2">
              <label className="text-sm font-bold">
                Industry of your company
              </label>
              <input
                value={industry}
                name="company"
                onChange={(e) => setIndustry(e.target.value)}
                placeholder="Industry of your company"
                className="text-black p-2 text-sm rounded-lg w-full"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-bold">Department</label>
              <input
                value={position}
                name="department"
                onChange={(e) => setPosition(e.target.value)}
                placeholder="Department"
                className="text-black p-2 text-sm rounded-lg w-full"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-bold">Company Size</label>
            {/* <input
              value={companySize}
              name="size"
              onChange={(e) => setCompanySize(e.target.value)}
              placeholder="Company Size"
              className="text-black p-2 text-sm rounded-lg w-full"
            /> */}
            <select
              value={companySize}
              onChange={((e) => {
                setCompanySize(e.target.value)
              })}
              className="text-black p-2 text-sm rounded-lg w-full">
              <option></option>
              <option value={'0-5'}>0-5</option>
              <option value={'5-10'}>5-10</option>
              <option value={'10-15'}> 10-15</option>
              <option value={'15-20'}>15-20</option>
            </select>
          </div>
          <Button
            style={{ backgroundColor: Colors.primary }}
            type="submit"
            className="w-full"
          >
            Submit
          </Button>
          <ToastContainer />

          <div className="mt-4 text-xs">
            <p className="">
              Already have an account ?{" "}
              <span className="">
                <Link href={"/login"} className="font-bold text-md">
                  {" "}
                  Login
                </Link>
              </span>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegistryForm;