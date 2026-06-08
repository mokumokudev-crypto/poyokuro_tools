const localCards = [
    {
      id: "n1",
      name: "慈悲の刃",
      image_url: `${import.meta.env.BASE_URL}/cards/ace_red_a.png`,
  
      card_type: {
        internal_id: "attack",
        display_name: "アタック",
      },
  
      is_ace: true,
      is_local: true,
      is_new: true,
    },
    {
        id: "n2",
        name: "エリートコマンダー",
        image_url: `${import.meta.env.BASE_URL}/cards/ace_red_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },
      {
        id: "n3",
        name: "収穫の刻",
        image_url: `${import.meta.env.BASE_URL}/cards/ace_blue_a.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },
      {
        id: "n4",
        name: "収穫の刻",
        image_url: `${import.meta.env.BASE_URL}/cards/ace_blue_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },
      {
        id: "n5",
        name: "収穫の刻",
        image_url: `${import.meta.env.BASE_URL}/cards/ace_yellow_a.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },
      {
        id: "n6",
        name: "収穫の刻",
        image_url: `${import.meta.env.BASE_URL}/cards/ace_yellow_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },
      {
        id: "n7",
        name: "収穫の刻",
        image_url: `${import.meta.env.BASE_URL}/cards/ace_green_a.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },
      {
        id: "n8",
        name: "収穫の刻",
        image_url: `${import.meta.env.BASE_URL}/cards/ace_green_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },
      {
        id: "n9",
        name: "夢野あかり",
        image_url: `${import.meta.env.BASE_URL}/cards/akari_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/akari_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n10",
        name: "夢野あかり",
        image_url: `${import.meta.env.BASE_URL}/cards/raizin_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/raizin_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n11",
        name: "夢野あかり",
        image_url: `${import.meta.env.BASE_URL}/cards/voka_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/voka_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n12",
        name: "夢野あかり",
        image_url: `${import.meta.env.BASE_URL}/cards/aria_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/aria_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n13",
        name: "くろむ",
        image_url: `${import.meta.env.BASE_URL}/cards/kurom_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/kurom_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n14",
        name: "くろむ",
        image_url: `${import.meta.env.BASE_URL}/cards/ramune_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/ramune_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n15",
        name: "くろむ",
        image_url: `${import.meta.env.BASE_URL}/cards/mother_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/mother_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n16",
        name: "くろむ",
        image_url: `${import.meta.env.BASE_URL}/cards/mea_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/mea_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n17",
        name: "ちせ",
        image_url: `${import.meta.env.BASE_URL}/cards/chise_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/chise_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n18",
        name: "ちせ",
        image_url: `${import.meta.env.BASE_URL}/cards/uhi_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/uhi_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n19",
        name: "ちせ",
        image_url: `${import.meta.env.BASE_URL}/cards/toko_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/toko_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n20",
        name: "ちせ",
        image_url: `${import.meta.env.BASE_URL}/cards/obo_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/obo_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n21",
        name: "サイネ",
        image_url: `${import.meta.env.BASE_URL}/cards/saine_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/saine_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n22",
        name: "サイネ",
        image_url: `${import.meta.env.BASE_URL}/cards/tentei_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/tentei_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n23",
        name: "サイネ",
        image_url: `${import.meta.env.BASE_URL}/cards/zyasu_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/zyasu_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n24",
        name: "サイネ",
        image_url: `${import.meta.env.BASE_URL}/cards/inui_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}/cards/inui_a.png`,
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
  ];
  
  export default localCards;