"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Colors } from "@/constant/colors";
import Link from "next/link";
import { countries } from "@/constant/data";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

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
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const router = useRouter()


  // Form validation logic
  const validateForm = () => {
    let valid = true;
    const newErrors: { [key: string]: string } = {};


    // Email validation
    if (firstName == "") {
      newErrors.firstName = 'First name is required';
      valid = false;
    } else {
      newErrors.firstName = 'First name is invalid';
      valid = false;
    }

    // if (!lastName) {
    //   newErrors.lastName = 'Last name is required';
    //   valid = false;
    // } else {
    //   newErrors.lastName = 'Last name not proper';
    //   valid = false;
    // }

    // if (!jobTitle) {
    //   newErrors.jobTitle = 'Job title is required';
    //   valid = false;
    // } else {
    //   newErrors.jobTitle = 'Job title is invalid';
    //   valid = false;
    // }

    // if (!company) {
    //   newErrors.company = 'Company name is required';
    //   valid = false;
    // } else {
    //   newErrors.company = 'Company name is invalid';
    //   valid = false;
    // }

    // if (!email) {
    //   newErrors.email = 'Email is required';
    //   valid = false;
    // } else if (!/\S+@\S+\.\S+/.test(email)) {
    //   newErrors.email = 'Email is invalid';
    //   valid = false;
    // }

    // if (!phoneNumber) {
    //   newErrors.phoneNumber = 'Phone number is required';
    //   valid = false;
    // } else {
    //   newErrors.phoneNumber = 'Phone number is invalid';
    //   valid = false;
    // }

    // if (!country) {
    //   newErrors.country = 'Country name is required';
    //   valid = false;
    // } else {
    //   newErrors.country = 'Country name is invalid';
    //   valid = false;
    // }


    // if (!state) {
    //   newErrors.state = 'State is required';
    //   valid = false;
    // } else {
    //   newErrors.state = 'State is invalid';
    //   valid = false;
    // }

    // if (!industry) {
    //   newErrors.industry = 'Industry name is required';
    //   valid = false;
    // } else {
    //   newErrors.industry = 'Industry name is invalid';
    //   valid = false;
    // }

    // if (!position) {
    //   newErrors.position = 'Department is required';
    //   valid = false;
    // } else {
    //   newErrors.position = 'Department is invalid';
    //   valid = false;
    // }

    // if (!companySize) {
    //   newErrors.companySize = 'Company size name is required';
    //   valid = false;
    // } else {
    //   newErrors.companySize = 'Company name is invalid';
    //   valid = false;
    // }

    setErrors(newErrors);
    return valid;
  };


  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (validateForm()) {
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
      } else {
        toast.error('Form submission failed due to validation errors');
      }


    } catch (error) {
      toast.error("Unable to register");
    }
  };
  return (
    <div className="border rounded flex flex-col md:flex-row  gap-8 m-8">
      <div className="flex items-center justify-center bg-white px-8 py-8 md:py-0">
        <Image src={"/home/logo.png"} priority width={200} height={200} alt="logo" />
      </div>
      <div className="relative p-8 text-white placeholder:text-white">
        <Button
          onClick={() => router.back()}
          variant={'ghost'}
          className="absolute top-0 right-0 m-4">
          <X />
        </Button>
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
              {errors.firstName && <span className="text-xs text-red-200">{errors.firstName}</span>}
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
              {errors.lastName && <span className="text-xs text-red-200">{errors.lastName}</span>}
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
              {errors.jobTitle && <span className="text-xs text-red-200">{errors.jobTitle}</span>}
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
              {errors.company && <span className="text-xs text-red-200">{errors.company}</span>}
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
              {errors.email && <span className="text-xs text-red-200">{errors.email}</span>}
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
              {errors.phoneNumber && <span className="text-xs text-red-200">{errors.phoneNumber}</span>}
            </div>
          </div>
          <div className="flex gap-6 w-full placeholder:text-white">
            <div className="grid gap-2">
              <label className="text-sm font-bold">Country/Region</label>
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
              {errors.country && <span className="text-xs text-red-200">{errors.country}</span>}
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
              {errors.state && <span className="text-xs text-red-200">{errors.state}</span>}
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
              {errors.industry && <span className="text-xs text-red-200">{errors.industry}</span>}
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
              {errors.position && <span className="text-xs text-red-200">{errors.position}</span>}
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-bold">Company Size</label>
            <select
              value={companySize}
              onChange={((e) => {
                setCompanySize(e.target.value)
              })}
              className="text-black p-2 text-sm rounded-lg w-full">
              <option></option>
              <option value={'Micro Enterprise: 1-9 employees'}>Micro Enterprise: 1-9 employees</option>
              <option value={'Small Enterprise: 10-49 employees'}>Small Enterprise: 10-49 employees</option>
              <option value={'Medium Enterprise: 50-249 employees'}>Medium Enterprise: 50-249 employees</option>
              <option value={'Large Enterprise: 250-999 employees'}>Large Enterprise: 250-999 employees</option>
              <option value={'Enterprise: 1000+ employees'}>Enterprise: 1000+ employees</option>
            </select>
            {errors.companySize && <span className="text-xs text-red-200">{errors.companySize}</span>}
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