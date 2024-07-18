import axios from "axios";
import { load } from "cheerio"; // Import load instead of cheerio
import React, { useEffect, useState } from "react";
import "../styles/items-for-sale.css";
import vinyl from "../images/VINYL MOCKUP WITH SHADOW.png";
import earrings from "../images/earrings.png";

const url =
  "https://corsproxy.io/?" +
  encodeURIComponent("https://adultdvd.bandcamp.com/merch");

const fetchItemsForSale = async () => {
  try {
    // Fetch the HTML of the page
    const { data } = await axios.get(`${url}?t=${new Date().getTime()}`);

    // Load the HTML into cheerio using load()
    const $ = load(data);

    // Define an array to hold the items
    let items = [];

    // Select the elements that contain the item information
    $(".merch-grid li").each((index, element) => {
      const title = $(element).find(".title").text().trim();
      const merchType = $(element).find(".merchtype").text().trim();

      const price = $(element).find(".sold-out").text().trim()
        ? $(element).find(".sold-out").text().trim()
        : $(element).find(".price .price").text().trim();
      const imageUrl = $(element).find(".art img").attr("src");
      const itemUrl = `https://adultdvd.bandcamp.com${$(element)
        .find("a")
        .attr("href")}`;

      // Add the item to the array
      items.push({ title, price, imageUrl, itemUrl, merchType });
    });

    return items;
  } catch (error) {
    console.error("Error fetching the items:", error);
    return [];
  }
};

export const Store = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const fetchedItems = await fetchItemsForSale();
      fetchedItems.push(
        {
          title: "Next Day Shipping EP Vinyl",
          price: "£15",
          imageUrl: vinyl,
        },
        {
          title: "Monkey Earrings",
          price: "£21",
          imageUrl: earrings,
        }
      );
      setItems(fetchedItems);
    };

    fetchItems();
  }, []);

  console.log(items);

  return (
    <div className="container">
      <div className="items-container">
        {items.map((item, index) => (
          <a
            className="item-link"
            target="_blank"
            href={item.itemUrl}
            key={index}
          >
            <div className="item-image-container">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="item-image"
              />
            </div>
            <div className="item-info">
              <h2 className="item-title">{item.title}</h2>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontFamily: "arial",
                  margin: "4px 0 4px 0",
                }}
              >
                {item.merchType}
              </p>
              <p className="item-price">{item.price}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};
