  "use client";

  import { useState } from "react";
  import FormDiskusi from "@/components/organism/form/diskusi";
  import FormProject from "@/components/organism/form/proyek";
  import GradientButton, {
    BackButton,
    SolidButton,
  } from "@/components/atoms/button/button";
  import ColTextImage from "@/components/molecules/column/column";
  import H1 from "@/components/atoms/heading/heading";
  import Paragraph from "@/components/atoms/paragraft/paragraf";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import { faTimes } from "@fortawesome/free-solid-svg-icons";


  export function FormOverlay({ children, onClose }) {
    return (
      <div className="bg-[#000000d3] h-screen z-[500] fixed inset-0 lg:py-10 flex justify-center items-center">
        <div className="relative bg-[#202125] h-[90vh] w-full max-w-[80%] mx-auto rounded-2xl p-4 flex justify-center items-center">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          >
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>

          {children}
        </div>
      </div>
    );
  }

  export default function Pengajuan() {
    const [activeForm, setActiveForm] = useState(null);

    const openDiskusiForm = () => setActiveForm("diskusi");
    const openProjectForm = () => setActiveForm("project");
    const closeForm = () => setActiveForm(null);

    return (
      <>
        <BackButton />
        {activeForm === "diskusi" && (
          <FormOverlay onClose={closeForm}>
            <FormDiskusi />
          </FormOverlay>
        )}
                {activeForm === "project" && (
          <FormOverlay onClose={closeForm}>
            <FormProject />
          </FormOverlay>
        )}
        <main
          className="
          z-[10] 
        px-10
        md:px-30
        lg:px-30
        "
        >
          <ColTextImage
            IdSection="form"
            SrcImg="/image/brif-ai.jpg"
            AltImg="Brief AI Creativolve Agency"
          >
            <H1>Lengkapi Form Untuk Mengajukan Kepentingan Anda!</H1>
            <Paragraph>
              Silahkan lengkapi form untuk mengajukan diskusi atau project agar
              kami bisa menyelesaikan masalah dan memenuhi kebutuhan digital anda
              dengan tepat!
            </Paragraph>
            <div className="button flex gap-6">
              <SolidButton onClick={openDiskusiForm}>Ajukan Diskusi</SolidButton>
              <GradientButton onClick={openProjectForm}>Ajukan Proyek</GradientButton>
            </div>
          </ColTextImage>
        </main>
      </>
    );
  }
