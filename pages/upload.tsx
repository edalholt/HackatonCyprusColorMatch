import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { faDove } from "@fortawesome/free-solid-svg-icons";
import Header from "../components/Header";
import { getEnvironmentData } from "worker_threads";
import { Input, Button, Image } from "@chakra-ui/react";

const Home: NextPage = () => {
  const [colors, setColors] = useState<string[]>([]);
  const [imageURL, setImageURL] = useState<string>(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrXhsOM-g8P70wrkWBfj3ScSOPMYm922Na1R4yrjL7&s"
  );
  const [URL, setURL] = useState<string>("");
  const router = useRouter();

  async function colorCheck(imageURL: string) {
    const response = await fetch(
      `https://api.imagga.com/v2/colors?image_url=` + imageURL,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic YWNjX2FhZDJkMzI5Y2FmMGM4ZTpiNDk4YmNjMjM0NjlkOGU0ZWNkNjViNjIyNDdiYmRjNg==",
        },
      }
    );
    const resp = await response.json();
    let colorList: string[] = [];
    for (let i = 0; i < resp.result.colors.background_colors.length; i++) {
      colorList.push(
        resp.result.colors.background_colors[i].closest_palette_color_html_code
      );
    }
    setColors(colorList);
    return resp;
  }

  useEffect(() => {
    colorCheck(imageURL);
  }, [imageURL]);

  return colors.length == 0 ? (
    <>loading</>
  ) : (
    <div>
      <Header />

      <div
        style={{
          backgroundColor: "#284b63",
          height: "95vh",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src={imageURL} width={300} height={300} />
        <Input
          _placeholder={{ color: "white", opacity: "50%" }}
          placeholder="Insert Image URL here"
          color="white"
          w={`90%`}
          onChange={(e: any) => setURL(e.target.value)}
        />
        <Button colorScheme="teal" w={`60%`} onClick={() => setImageURL(URL)}>
          Get colors
        </Button>
        <div
          style={{
            width: "80%",
          }}
        >
          {colors.map((member, i) => (
            <div
              style={{
                marginLeft: "10px",
                padding: "20px 50px 20px 50px",
                overflow: "hidden",
                backgroundColor: member,
                color: "white",
                textAlign: "center",
              }}
              key={i}
            >
              {member}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
