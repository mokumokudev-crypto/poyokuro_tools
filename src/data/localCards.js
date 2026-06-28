const localCards = [
    /********************************
     * エース
     ********************************/
    {
      id: "n1",
      name: "慈悲の刃",
      image_url: `${import.meta.env.BASE_URL}cards/ace_red_a.png`,
  
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
        image_url: `${import.meta.env.BASE_URL}cards/ace_red_m.png`,
    
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
        name: "オーバードライブ",
        image_url: `${import.meta.env.BASE_URL}cards/ace_blue_a.png`,
    
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
        name: "ダイナミックデュオ",
        image_url: `${import.meta.env.BASE_URL}cards/ace_blue_m.png`,
    
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
        name: "テラーエンゲージ",
        image_url: `${import.meta.env.BASE_URL}cards/ace_yellow_a.png`,
    
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
        name: "グレイトフルファーマー",
        image_url: `${import.meta.env.BASE_URL}cards/ace_yellow_m.png`,
    
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
        name: "アナイアレーション",
        image_url: `${import.meta.env.BASE_URL}cards/ace_green_a.png`,
    
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
        image_url: `${import.meta.env.BASE_URL}cards/ace_green_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        is_ace: true,
        is_local: true,
        is_new: true,
      },
     /********************************
      * リーダー
     ********************************/
      {
        id: "n9",
        name: "夢野あかり",
        image_url: `${import.meta.env.BASE_URL}cards/akari_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/akari_a.png`,
        family_id:"n9",
    
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
        name: "らいじん",
        image_url: `${import.meta.env.BASE_URL}cards/raizin_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/raizin_a.png`,
        family_id:"n10",
    
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
        name: "うぉっか",
        image_url: `${import.meta.env.BASE_URL}cards/voka_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/voka_a.png`,
        family_id:"n11",
    
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
        name: "昏昏アリア",
        image_url: `${import.meta.env.BASE_URL}cards/aria_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/aria_a.png`,
        family_id:"n12",
    
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
        name: "夜乃くろむ",
        image_url: `${import.meta.env.BASE_URL}cards/kurom_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/kurom_a.png`,
        family_id:"n13",
    
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
        name: "白波らむね",
        image_url: `${import.meta.env.BASE_URL}cards/ramune_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/ramune_a.png`,
        family_id:"n14",
    
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
        name: "まざー３",
        image_url: `${import.meta.env.BASE_URL}cards/mother_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/mother_a.png`,
        family_id:"n15",
    
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
        name: "神楽めあ",
        image_url: `${import.meta.env.BASE_URL}cards/mea_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/mea_a.png`,
        family_id:"n16",
    
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
        name: "龍巻ちせ",
        image_url: `${import.meta.env.BASE_URL}cards/chise_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/chise_a.png`,
        family_id:"n17",
    
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
        name: "千燈うひ",
        image_url: `${import.meta.env.BASE_URL}cards/uhi_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/uhi_a.png`,
        family_id:"n18",
    
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
        name: "とおこ",
        image_url: `${import.meta.env.BASE_URL}cards/toko_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/toko_a.png`,
        family_id:"n19",
    
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
        name: "おぼ",
        image_url: `${import.meta.env.BASE_URL}cards/obo_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/obo_a.png`,
        family_id:"n20",
    
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
        name: "銀城サイネ",
        image_url: `${import.meta.env.BASE_URL}cards/saine_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/saine_a.png`,
        family_id:"n21",
    
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
        name: "天帝フォルテ",
        image_url: `${import.meta.env.BASE_URL}cards/tentei_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/tentei_a.png`,
        family_id:"n22",
    
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
        name: "じゃすぱー",
        image_url: `${import.meta.env.BASE_URL}cards/zyasu_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/zyasu_a.png`,
        family_id:"n23",
    
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
        name: "乾伸一郎",
        image_url: `${import.meta.env.BASE_URL}cards/inui_b.png`,
        awaken_image_url:`${import.meta.env.BASE_URL}cards/inui_a.png`,
        family_id:"n24",
    
        card_type: {
          internal_id: "leader",
          display_name: "リーダー",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      /********************************
        * リーダー専用カード
      ********************************/
      {
        id: "n25",
        name: "あああ6",
        image_url: `${import.meta.env.BASE_URL}cards/aria_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n12",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n26",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/aria_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },

        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n12",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n27",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/voka_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n11",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n28",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/voka_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n11",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n29",
        name: "あああ6",
        image_url: `${import.meta.env.BASE_URL}cards/ramune_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n14",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n30",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/ramune_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },

        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n14",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n31",
        name: "あああ6",
        image_url: `${import.meta.env.BASE_URL}cards/mea_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n16",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n32",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/mea_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },

        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n16",
        },
    
        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n33",
        name: "いいい",
        image_url: `${import.meta.env.BASE_URL}cards/obo_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n20",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n34",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/obo_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n20",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n35",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/uhi_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n18",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n36",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/uhi_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n18",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n37",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/saine_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n21",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n38",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/saine_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n21",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n39",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/inui_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n24",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n40",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/inui_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n24",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n41",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/raizin_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n10",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n42",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/raizin_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n10",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n43",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/akari_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n9",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n44",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/akari_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n9",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n45",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/mother_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n15",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n46",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/mother_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n15",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n47",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/kurom_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n13",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n48",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/kurom_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n13",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n49",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/toko_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n19",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n50",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/toko_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n19",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n51",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/chise_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n17",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n52",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/chise_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n17",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n53",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/tentei_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n22",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n54",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/tentei_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n22",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n55",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/zyasu_at.png`,
    
        card_type: {
          internal_id: "attack",
          display_name: "アタック",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n23",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
      {
        id: "n56",
        name: "あああ",
        image_url: `${import.meta.env.BASE_URL}cards/zyasu_m.png`,
    
        card_type: {
          internal_id: "memoria",
          display_name: "メモリア",
        },
    
        build_rule:{
          type:"require_leader",
          description:"リーダー：あああ",
          family_id:"n23",
        },

        is_ace: false,
        is_local: true,
        is_new: true,
      },
  ];
  
  export default localCards;