import type { BoardCategory, BoardCode } from "../types/board"

export const DEFAULT_BOARD_CODE: BoardCode = "BDAAAA01"

export const BOARD_CATEGORIES: BoardCategory[] = [
  {
    code: "BDAAAA01",
    slug: "posts",
    name: "글",
    description: "자유롭게 글을 남기는 기본 게시판",
    allowComments: true,
    allowFiles: false,
    allowEncryptedPosts: false,
  },
  {
    code: "BDAAAA02",
    slug: "books",
    name: "책",
    description: "읽은 책과 서평을 기록하는 공간",
    allowComments: false,
    allowFiles: true,
    allowEncryptedPosts: true,
  },
  {
    code: "BDAAAA03",
    slug: "music",
    name: "음악",
    description: "좋아하는 음악과 플레이리스트 공유",
    allowComments: true,
    allowFiles: true,
    allowEncryptedPosts: false,
  },
  {
    code: "BDAAAA04",
    slug: "movies",
    name: "영화",
    description: "영화 감상평과 추천 목록",
    allowComments: true,
    allowFiles: true,
    allowEncryptedPosts: false,
  },
  {
    code: "BDAAAA05",
    slug: "photos",
    name: "사진",
    description: "사진과 앨범을 모아보는 공간",
    allowComments: true,
    allowFiles: true,
    allowEncryptedPosts: false,
  },
  {
    code: "BDAAAA06",
    slug: "memories",
    name: "기억",
    description: "개인적인 기록과 추억 보관",
    allowComments: false,
    allowFiles: false,
    allowEncryptedPosts: true,
  },
  {
    code: "BDAAAA07",
    slug: "relationships",
    name: "인연",
    description: "사람과의 인연, 관계 기록",
    allowComments: true,
    allowFiles: false,
    allowEncryptedPosts: false,
  },
  {
    code: "BDAAAA08",
    slug: "chat",
    name: "잡담",
    description: "가벼운 이야기를 나누는 공간",
    allowComments: true,
    allowFiles: false,
    allowEncryptedPosts: false,
  },
  {
    code: "BDAAAA09",
    slug: "dreams",
    name: "꿈",
    description: "꿈 일기와 해석을 기록",
    allowComments: true,
    allowFiles: true,
    allowEncryptedPosts: true,
  },
]

export const BOARD_CATEGORY_BY_CODE: Record<BoardCode, BoardCategory> = BOARD_CATEGORIES.reduce(
  (acc, category) => {
    acc[category.code] = category
    return acc
  },
  {} as Record<BoardCode, BoardCategory>
)

export const BOARD_CATEGORY_BY_SLUG = BOARD_CATEGORIES.reduce(
  (acc, category) => {
    acc[category.slug] = category
    return acc
  },
  {} as Record<string, BoardCategory>
)
