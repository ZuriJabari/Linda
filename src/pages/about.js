import React from 'react';
import Layout from '../components/Layout';

const AboutPage = () => {
  return (
    <Layout seo={{ title: 'About' }}>
      <div className="bg-white py-24 sm:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto lg:mx-0">
            <h1 className="text-4xl font-bold tracking-tight text-brand-dark sm:text-6xl font-serif">About Linda Mutesi</h1>
            <p className="mt-6 text-lg leading-8 text-brand-gray">
              A passionate community builder, dedicated to fostering talent, championing the arts, and empowering marginalized voices.
            </p>
          </div>
          <div className="mt-16 space-y-8 text-lg text-brand-gray leading-7">
            <p>
              Linda is a passionate community builder, who has over the last 15 years invested herself in supporting the growth of communities that support talent and skills development, spaces for the visual arts to thrive, championing youth and women startups, and has been an effective voice for marginalised groups in society.
            </p>
            <p>
              Trained as a lawyer and an advocate of the Ugandan Courts of Judicature, Linda is a partner at Adalci Advocates. She serves on various Boards as Director, Co-Founder & Patron for organisations she directly supports and those she has founded.
            </p>
            <p>
              A committed mobiliser of people and resources, Linda’s work spans across different areas of impact, particularly those that uplift society, such as the visual arts, women in business, promotion of African literature/authors, funding for youth enterprise and building a culture of ‘giving and sharing’ based on the intrinsic values of African philanthropy.
            </p>
            <p>
              Through The Bold Woman Fund, Linda has created programs that support Ugandan women entrepreneurs in the fashion and design industry in Uganda through various trainings and provision of a last mile retail solution for these young women’s work at her Bold in Africa Store that carries made in Africa brands only.
            </p>
            <p>
              A current student at the University of Kent in the United Kingdom, pursuing an MA in Philanthropic Studies, Linda is a mother of two teenage boys, 13 and 15 years old. Her favorite pastimes are reading, participating and contributing to cultural events and conversation.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AboutPage;
