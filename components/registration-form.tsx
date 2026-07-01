"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { submitRegistration } from "@/lib/actions";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  affiliation: z.string().min(1, {
    message: "Affiliation is required.",
  }),
  affiliationOther: z.string().optional(),
  country: z.string().min(1, {
    message: "Country is required.",
  }),
  nationality: z.string().min(1, {
    message: "Nationality is required.",
  }),
  position: z.enum(
    [
      "bachelor_student",
      "master_student",
      "phd_student",
      "researcher",
      "professor",
      "industry",
      "other",
    ],
    {
      required_error: "Please select your position.",
    },
  ),
  positionOther: z.string().optional(),
  website: z.string().min(1, {
    message: "Please enter your website or LinkedIn URL.",
  }),
  attendanceReason: z.array(z.string()).min(1, {
    message: "Please select at least one reason.",
  }),
  attendanceReasonOther: z.string().optional(),
  presenting: z.enum(["submitted", "planning", "no"], {
    required_error: "Please select an option.",
  }),
  attendanceDays: z.enum(["both", "friday", "saturday"], {
    required_error: "Please select which days you plan to attend.",
  }),
  dietaryRestrictions: z.array(z.string()).min(1, {
    message: "Please select at least one option.",
  }),
  dietaryRestrictionsOther: z.string().optional(),
  beveragePreference: z.array(z.string()).min(1, {
    message: "Please select at least one option.",
  }),
  attendingDinner: z.enum(["yes", "still_deciding", "no"], {
    required_error: "Please select an option.",
  }),
  consentPublicList: z.literal(true, {
    errorMap: () => ({ message: "This consent is required to register." }),
  }),
  consentPhotography: z.literal(true, {
    errorMap: () => ({ message: "This consent is required to register." }),
  }),
  howDidYouHear: z
    .enum([
      "university",
      "facebook",
      "instagram",
      "linkedin",
      "friend_attended",
      "friend_not_attended",
      "geomundus_website",
      "other",
    ])
    .optional(),
  howDidYouHearOther: z.string().optional(),
  additionalComments: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const countries = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina",
  "Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain",
  "Bangladesh","Barbados","Belarus","Belgium","Belize","Benin",
  "Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Brazil",
  "Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon",
  "Canada","Cape Verde","Central African Republic","Chad","Chile",
  "China","Colombia","Comoros","Congo","Costa Rica","Croatia","Cuba",
  "Cyprus","Czech Republic","Denmark","Djibouti","Dominican Republic",
  "East Timor","Ecuador","Egypt","El Salvador","Equatorial Guinea",
  "Eritrea","Estonia","Eswatini","Ethiopia","Fiji","Finland","France",
  "Gabon","Gambia","Georgia","Germany","Ghana","Greece","Grenada",
  "Guatemala","Guinea","Guyana","Haiti","Honduras","Hungary","Iceland",
  "India","Indonesia","Iran","Iraq","Ireland","Israel","Italy",
  "Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kosovo","Kuwait",
  "Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya",
  "Liechtenstein","Lithuania","Luxembourg","Madagascar","Malawi",
  "Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius",
  "Mexico","Moldova","Monaco","Mongolia","Montenegro","Morocco",
  "Mozambique","Myanmar","Namibia","Nepal","Netherlands","New Zealand",
  "Nicaragua","Niger","Nigeria","North Korea","North Macedonia","Norway",
  "Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay",
  "Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia",
  "Rwanda","Saudi Arabia","Senegal","Serbia","Sierra Leone","Singapore",
  "Slovakia","Slovenia","Somalia","South Africa","South Korea","Spain",
  "Sri Lanka","Sudan","Suriname","Sweden","Switzerland","Syria",
  "Taiwan","Tajikistan","Tanzania","Thailand","Togo","Trinidad and Tobago",
  "Tunisia","Turkey","Turkmenistan","Uganda","Ukraine",
  "United Arab Emirates","United Kingdom","United States","Uruguay",
  "Uzbekistan","Vatican City","Venezuela","Vietnam","Yemen","Zambia",
  "Zimbabwe",
];

export function RegistrationForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      affiliation: "",
      affiliationOther: "",
      country: "",
      nationality: "",
      positionOther: "",
      website: "",
      attendanceReason: [],
      attendanceReasonOther: "",
      dietaryRestrictions: [],
      dietaryRestrictionsOther: "",
      beveragePreference: [],
      consentPublicList: undefined as unknown as true,
      consentPhotography: undefined as unknown as true,
      howDidYouHearOther: "",
      additionalComments: "",
    },
  });

  const watchAffiliation = form.watch("affiliation");
  const watchPosition = form.watch("position");
  const watchAttendanceReason = form.watch("attendanceReason");

  const totalSteps = 5;

  const getStepName = (step: number) => {
    switch (step) {
      case 1: return "basic_information";
      case 2: return "participation_details";
      case 3: return "dietary_preferences";
      case 4: return "communication_consent";
      case 5: return "additional_information";
      default: return "unknown";
    }
  };

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      await submitRegistration({
        fullName: values.fullName,
        email: values.email,
        affiliation:
          values.affiliation === "other"
            ? values.affiliationOther || "Other"
            : values.affiliation,
        country: values.country,
        nationality: values.nationality,
        position: values.position,
        positionOther: values.positionOther,
        website: values.website,
        attendanceReason: values.attendanceReason,
        attendanceReasonOther: values.attendanceReasonOther,
        presenting: values.presenting,
        attendanceDays: values.attendanceDays,
        dietaryRestrictions: values.dietaryRestrictions,
        dietaryRestrictionsOther: values.dietaryRestrictionsOther,
        beveragePreference: values.beveragePreference,
        attendingDinner: values.attendingDinner,
        consentPublicList: values.consentPublicList,
        consentPhotography: values.consentPhotography,
        howDidYouHear: values.howDidYouHear,
        howDidYouHearOther: values.howDidYouHearOther,
        additionalComments: values.additionalComments,
      });

      toast({
        title: "Registration successful!",
        description: "You will receive a confirmation email shortly.",
      });

      router.push("/registration/success");
    } catch (error) {
      if (error instanceof Error && error.message === "EMAIL_ALREADY_REGISTERED") {
        setSubmitError(
          "This email address is already registered. If you need to update your registration, please contact us at program@geomundus.org",
        );
      } else {
        setSubmitError(
          "Something went wrong. Please try again or contact program@geomundus.org for help.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const validateStep = async () => {
    let fieldsToValidate: (keyof FormValues)[] = [];
    switch (currentStep) {
      case 1:
        fieldsToValidate = ["fullName", "email", "affiliation", "country", "nationality", "position", "website"];
        if (watchAffiliation === "other") fieldsToValidate.push("affiliationOther");
        if (watchPosition === "other") fieldsToValidate.push("positionOther");
        break;
      case 2:
        fieldsToValidate = ["attendanceReason", "presenting", "attendanceDays"];
        break;
      case 3:
        fieldsToValidate = ["dietaryRestrictions", "beveragePreference", "attendingDinner"];
        break;
      case 4:
        fieldsToValidate = ["consentPublicList", "consentPhotography"];
        break;
    }
    const result = await form.trigger(fieldsToValidate);
    return result;
  };

  const handleNext = async () => {
    const valid = await validateStep();
    if (valid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            GeoMundus 2026 Registration
          </CardTitle>
          <CardDescription>
            Geospatial Intelligence for Disaster Resilience
            <br />
            October 16-17, 2026 - Universitat Jaume I, Castellon de la Plana, Spain
          </CardDescription>
          <div className="flex justify-center gap-2 mt-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`h-2 w-12 rounded-full transition-colors ${
                  i + 1 <= currentStep ? "bg-teal-600" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Step {currentStep} of {totalSteps}:{" "}
            {getStepName(currentStep).replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())}
          </p>
        </CardHeader>

        <CardContent>
          {submitError && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{submitError}</AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-8">

              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Section 1: Basic Information</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Some of the information below will be printed on your entrance badge.
                    </p>
                  </div>

                  <FormField control={form.control} name="fullName" render={({ field }) => (
                    <FormItem>
                      <FormLabel>1. Full Name *</FormLabel>
                      <FormControl><Input placeholder="Your full name" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem>
                      <FormLabel>2. Email Address *</FormLabel>
                      <FormControl><Input type="email" placeholder="your.email@example.com" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="affiliation" render={({ field }) => (
                    <FormItem>
                      <FormLabel>3. Affiliation (University / Organization) *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select your affiliation" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="NOVA IMS">NOVA IMS</SelectItem>
                          <SelectItem value="UJI">UJI</SelectItem>
                          <SelectItem value="IFGI">IFGI</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {watchAffiliation === "other" && (
                    <FormField control={form.control} name="affiliationOther" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify your affiliation</FormLabel>
                        <FormControl><Input placeholder="Your university or organization" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  )}

                  <FormField control={form.control} name="country" render={({ field }) => (
                    <FormItem>
                      <FormLabel>4. Country of Residence *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select your country" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="nationality" render={({ field }) => (
                    <FormItem>
                      <FormLabel>5. What is your nationality? *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger><SelectValue placeholder="Select your nationality" /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries.map((c) => (
                            <SelectItem key={c} value={c}>{c}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="position" render={({ field }) => (
                    <FormItem>
                      <FormLabel>6. Position / Role * (select one option)</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                          {[
                            { value: "bachelor_student", label: "Bachelor Student" },
                            { value: "master_student", label: "Master Student" },
                            { value: "phd_student", label: "PhD Student" },
                            { value: "researcher", label: "Researcher" },
                            { value: "professor", label: "Professor / Lecturer" },
                            { value: "industry", label: "Industry Professional" },
                            { value: "other", label: "Other" },
                          ].map((opt) => (
                            <div key={opt.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={opt.value} id={`pos_${opt.value}`} />
                              <Label htmlFor={`pos_${opt.value}`}>{opt.label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {watchPosition === "other" && (
                    <FormField control={form.control} name="positionOther" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify your position</FormLabel>
                        <FormControl><Input placeholder="Your position" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  )}

                  <FormField control={form.control} name="website" render={({ field }) => (
                    <FormItem>
                      <FormLabel>7. Professional Website or LinkedIn *</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        The link will be available on the QR code on your entrance badge.
                      </p>
                      <FormControl><Input type="url" placeholder="https://linkedin.com/in/yourprofile" {...field} /></FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Section 2: Participation Details</h3>
                  </div>

                  <FormField control={form.control} name="attendanceReason" render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          8. What is your main reason for attending GeoMundus 2026? (Select all that apply) *
                        </FormLabel>
                      </div>
                      {[
                        { id: "present_research", label: "To present research" },
                        { id: "attend_sessions", label: "To attend sessions" },
                        { id: "networking", label: "Networking" },
                        { id: "other", label: "Other" },
                      ].map((item) => (
                        <FormField key={item.id} control={form.control} name="attendanceReason" render={({ field }) => (
                          <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...(field.value || []), item.id]
                                    : field.value?.filter((v: string) => v !== item.id);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        )} />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )} />

                  {watchAttendanceReason?.includes("other") && (
                    <FormField control={form.control} name="attendanceReasonOther" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify</FormLabel>
                        <FormControl><Input placeholder="Your reason for attending" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  )}

                  <FormField control={form.control} name="presenting" render={({ field }) => (
                    <FormItem>
                      <FormLabel>9. Do you plan to submit your work for the conference? *</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="submitted" id="pres_submitted" />
                            <Label htmlFor="pres_submitted">Yes, I have already submitted an abstract or map.</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="planning" id="pres_planning" />
                            <Label htmlFor="pres_planning">Yes, I am planning to submit it.</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="pres_no" />
                            <Label htmlFor="pres_no">No.</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="attendanceDays" render={({ field }) => (
                    <FormItem>
                      <FormLabel>10. On which days are you planning to attend? *</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="both" id="days_both" />
                            <Label htmlFor="days_both">Both days</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="friday" id="days_friday" />
                            <Label htmlFor="days_friday">Friday (October 16th)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="saturday" id="days_saturday" />
                            <Label htmlFor="days_saturday">Saturday (October 17th)</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Section 3: Dietary Preferences</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      We will have coffee breaks and lunches on both days, as well as a conference
                      dinner on Friday, October 16th (on a first-come basis, attendance is subject
                      to confirmation by the GeoMundus team). Please specify your dietary restrictions
                      and preferences below.
                    </p>
                  </div>

                  <FormField control={form.control} name="dietaryRestrictions" render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          11. Do you have any dietary restrictions or food allergies? (Select all that apply) *
                        </FormLabel>
                      </div>
                      {[
                        { id: "none", label: "None" },
                        { id: "vegetarian", label: "Vegetarian" },
                        { id: "halal", label: "Halal" },
                        { id: "gluten_free", label: "Gluten-free" },
                        { id: "lactose_free", label: "Lactose-free" },
                        { id: "allergies", label: "Allergies (please specify)" },
                        { id: "other", label: "Other (please specify)" },
                      ].map((item) => (
                        <FormField key={item.id} control={form.control} name="dietaryRestrictions" render={({ field }) => (
                          <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...(field.value || []), item.id]
                                    : field.value?.filter((v: string) => v !== item.id);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        )} />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )} />

                  {(form.watch("dietaryRestrictions")?.includes("allergies") ||
                    form.watch("dietaryRestrictions")?.includes("other")) && (
                    <FormField control={form.control} name="dietaryRestrictionsOther" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify</FormLabel>
                        <FormControl><Input placeholder="Please describe your dietary restrictions or allergies" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  )}

                  <FormField control={form.control} name="beveragePreference" render={() => (
                    <FormItem>
                      <div className="mb-4">
                        <FormLabel className="text-base">
                          12. What are your beverage preferences? (Select all that apply) *
                        </FormLabel>
                      </div>
                      {[
                        { id: "alcoholic", label: "Alcoholic" },
                        { id: "non_alcoholic", label: "Non-alcoholic" },
                      ].map((item) => (
                        <FormField key={item.id} control={form.control} name="beveragePreference" render={({ field }) => (
                          <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  const newValue = checked
                                    ? [...(field.value || []), item.id]
                                    : field.value?.filter((v: string) => v !== item.id);
                                  field.onChange(newValue);
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">{item.label}</FormLabel>
                          </FormItem>
                        )} />
                      ))}
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="attendingDinner" render={({ field }) => (
                    <FormItem>
                      <FormLabel>13. Are you interested in attending the conference dinner on Friday, October 16th? *</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="dinner_yes" />
                            <Label htmlFor="dinner_yes">Yes.</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="still_deciding" id="dinner_maybe" />
                            <Label htmlFor="dinner_maybe">I&apos;m still deciding.</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="dinner_no" />
                            <Label htmlFor="dinner_no">No.</Label>
                          </div>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              )}

              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Section 4: Communication and Consent</h3>
                  </div>

                  <FormField control={form.control} name="consentPublicList" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value === true} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          14. I consent to the publication of my name and affiliation on the official GeoMundus 2026 participants list.{" "}
                          <span className="text-red-500 font-semibold">(REQUIRED)</span>
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />

                  <FormField control={form.control} name="consentPhotography" render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value === true} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>
                          15. By attending this conference, I consent to being photographed and/or recorded during the event for promotional and archival purposes.{" "}
                          <span className="text-red-500 font-semibold">(REQUIRED)</span>
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              )}

              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Section 5: Additional Information</h3>
                  </div>

                  <FormField control={form.control} name="howDidYouHear" render={({ field }) => (
                    <FormItem>
                      <FormLabel>16. How did you hear about GeoMundus 2026?</FormLabel>
                      <FormControl>
                        <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                          {[
                            { value: "university", label: "University" },
                            { value: "facebook", label: "Facebook" },
                            { value: "instagram", label: "Instagram post" },
                            { value: "linkedin", label: "LinkedIn post" },
                            { value: "friend_attended", label: "Friend / Colleague who has attended a GeoMundus conference in the past" },
                            { value: "friend_not_attended", label: "Friend / Colleague who has not attended" },
                            { value: "geomundus_website", label: "GeoMundus Website" },
                            { value: "other", label: "Other" },
                          ].map((opt) => (
                            <div key={opt.value} className="flex items-center space-x-2">
                              <RadioGroupItem value={opt.value} id={`hear_${opt.value}`} />
                              <Label htmlFor={`hear_${opt.value}`}>{opt.label}</Label>
                            </div>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {form.watch("howDidYouHear") === "other" && (
                    <FormField control={form.control} name="howDidYouHearOther" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Please specify</FormLabel>
                        <FormControl><Input placeholder="How did you hear about us?" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  )}

                  <FormField control={form.control} name="additionalComments" render={({ field }) => (
                    <FormItem>
                      <FormLabel>17. Any comments, requests, or special needs?</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Optional" className="min-h-[100px]" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>
              )}

              <div className="flex justify-between pt-4">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>Previous</Button>
                ) : (
                  <div />
                )}
                {currentStep < totalSteps ? (
                  <Button type="button" onClick={handleNext}>Next</Button>
                ) : (
                  <Button type="button" disabled={isSubmitting} onClick={form.handleSubmit(onSubmit)}>
                    {isSubmitting ? "Submitting..." : "Submit Registration"}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

export default RegistrationForm;
