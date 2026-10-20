'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionStyle, type MotionValue } from 'motion/react'

type ArchitecturePreviewProps = { style?: MotionStyle }
type FlowProps = { d: string; color?: string; delay?: number; reverse?: boolean }

const logoUrls: Record<string, string> = {
  nextdotjs: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/nextdotjs.svg',
  nestjs: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/nestjs.svg',
  bullmq: 'https://bullmq.io/images/bullmq-logo.png',
  docker: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/docker.svg',
  kubernetes: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/kubernetes.svg',
  postgresql: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/postgresql.svg',
  redis: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/redis.svg',
  supabase: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/supabase.svg',
  openrouter: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/openrouter.svg',
  openai: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/openai.svg',
  prometheus: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/prometheus.svg',
  grafana: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/grafana.svg',
  terraform: 'https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/terraform.svg',
  acr: 'data:image/svg+xml;base64,PHN2ZyBpZD0iZTlmN2JhNzMtNTZiOC00ODY0LTk2ZmYtZGNlODBiZWY3MjlhIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImJkZjI3ZGM2LTAyNWMtNDgwNS04YmZkLTNhMDVkZWZkM2ZiZCIgeDE9IjguNjM3IiB5MT0iLTEuOTkxIiB4Mj0iOC42MzciIHkyPSIxNi43MzkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1ZWEwZWYiIC8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDA3OGQ0IiAvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJmY2Q2YzZjNy1lMmViLTRhMzItYjkxNC0zYTg0ODU1ODVhMWIiIHgxPSIxMi45NiIgeTE9IjguNTYxIiB4Mj0iMTIuOTYiIHkyPSI2LjE0MSIgZ3JhZGllbnRUcmFuc2Zvcm09Im1hdHJpeCgxLCAwLCAwLCAtMSwgMCwgMjApIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMzMzMTMyIiAvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzViNWE1YyIgLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJNNy40Myw4LjE3OGwyLjU4OS0xLjU3Myw3LjI1NSwyLjczMUEzLjY2NCwzLjY2NCwwLDAsMCwxNi4yMyw3LjQ5bC0uMDEtLjA1QTQuMTk0LDQuMTk0LDAsMCwwLDE0LDYuMzJhNC45MSw0LjkxLDAsMCwwLTUuMS00LjdBNS4wNzEsNS4wNzEsMCwwLDAsNC4wNiw0LjkxLDQuNjIxLDQuNjIxLDAsMCwwLDAsOS4zOWE0LjczLDQuNzMsMCwwLDAsNC44OSw0LjU0SDcuNDNaIiBmaWxsPSJ1cmwoI2JkZjI3ZGM2LTAyNWMtNDgwNS04YmZkLTNhMDVkZWZkM2ZiZCkiIC8+PHBvbHlnb24gcG9pbnRzPSIxMC4wNyA3LjE1OSAxMC4wOCAxMS40MzkgMTcuOTkgMTMuMTE5IDE3Ljk5IDEwLjEzOSAxMC4wNyA3LjE1OSIgZmlsbD0iIzc2NzY3NiIgLz48cG9seWxpbmUgcG9pbnRzPSIxMC4wNyA3LjE1OSA3LjkzIDguNDU5IDcuOTMgMTIuNDM5IDEwLjA4IDExLjQzOSIgZmlsbD0iIzk5OSIgLz48cG9seWdvbiBwb2ludHM9IjEzLjY4IDExLjQ5OSAxNC40IDExLjY5OSAxNC40IDkuMzY5IDEzLjY4IDkuMTE5IDEzLjY4IDExLjQ5OSIgZmlsbD0iI2EzYTNhMyIgLz48cG9seWdvbiBwb2ludHM9IjEyLjk2IDguODg5IDEyLjI0IDguNjI5IDEyLjI0IDExLjExOSAxMi45NiAxMS4zMTkgMTIuOTYgOC44ODkiIGZpbGw9IiNhM2EzYTMiIC8+PHBvbHlnb24gcG9pbnRzPSIxNS4xMiAxMS44ODkgMTUuODIgMTIuMDc5IDE1Ljg0IDkuODU5IDE1LjEyIDkuNjE5IDE1LjEyIDExLjg4OSIgZmlsbD0iI2EzYTNhMyIgLz48cG9seWdvbiBwb2ludHM9IjEwLjgxIDEwLjc0OSAxMS41MyAxMC45MjkgMTEuNTMgOC4zOTkgMTAuODEgOC4xNTkgMTAuODEgMTAuNzQ5IiBmaWxsPSIjYTNhM2EzIiAvPjxwb2x5Z29uIHBvaW50cz0iMTcuMjcgMTAuMzQ5IDE2LjU1IDEwLjA5OSAxNi41NSAxMi4yNjkgMTcuMjcgMTIuNDY5IDE3LjI3IDEwLjM0OSIgZmlsbD0iI2EzYTNhMyIgLz48cGF0aCBpZD0iZWYwZDFiNTQtYTFlNy00Y2I5LWE0ZTUtOGE4NTE4ZTdjMTI3IiBkPSJNOC42NiwxMS4zNjlsLS4zNi4yMVY4Ljc0OWwuMzYtLjE5Wm0uNzEtMy4yMkw5LDguMzg5djIuNzVsLjM3LS4yWiIgZmlsbD0iI2IzYjNiMyIgLz48cG9seWdvbiBwb2ludHM9IjE3Ljk5IDEzLjExOSAxNS44MyAxMy44NTkgNy45MyAxMi40MzkgMTAuMDggMTEuNDM5IDE3Ljk5IDEzLjExOSIgZmlsbD0idXJsKCNmY2Q2YzZjNy1lMmViLTRhMzItYjkxNC0zYTg0ODU1ODVhMWIpIiAvPjxwb2x5Z29uIHBvaW50cz0iMTcuOTkgMTYuMTY5IDEwLjA0IDE3LjY3OSAxMC4wOCAxMi4wODkgMTcuOTkgMTMuNTU5IDE3Ljk5IDE2LjE2OSIgZmlsbD0iIzc2NzY3NiIgLz48cG9seWdvbiBwb2ludHM9IjEwLjgxIDE2Ljc1OSAxMC44MSAxMy4yMDkgMTEuNTMgMTMuMjk5IDExLjUzIDE2LjYzOSAxMC44MSAxNi43NTkiIGZpbGw9IiNhM2EzYTMiIC8+PHBvbHlnb24gcG9pbnRzPSIxMi45NiAxNi4zOTkgMTIuMjQgMTYuNTI5IDEyLjI0IDEzLjM4OSAxMi45NiAxMy40OTkgMTIuOTYgMTYuMzk5IDEyLjk2IDE2LjM5OSIgZmlsbD0iI2EzYTNhMyIgLz48cG9seWdvbiBwb2ludHM9IjEzLjY4IDE2LjI4OSAxMy42OCAxMy41NjkgMTQuNCAxMy42NTkgMTQuNCAxNi4xNTkgMTMuNjggMTYuMjg5IiBmaWxsPSIjYTNhM2EzIiAvPjxwb2x5Z29uIHBvaW50cz0iMTUuODMgMTUuOTA5IDE1LjEyIDE2LjAzOSAxNS4xMiAxMy43NDkgMTUuODMgMTMuODU5IDE1LjgzIDE1LjkwOSIgZmlsbD0iI2EzYTNhMyIgLz48cG9seWdvbiBwb2ludHM9IjE3LjI5IDE1LjY3OSAxNi41NSAxNS44MDkgMTYuNTUgMTMuOTI5IDE3LjI0IDE0LjAxOSAxNy4yOSAxNS42NzkiIGZpbGw9IiNhM2EzYTMiIC8+PHBhdGggaWQ9ImI5ZjI1ZWI0LTRjODgtNDVjMi1iYzRkLWY5OTI3NTdkN2UwZSIgZD0iTTcuOTMsMTYuNHYtMy4yNmwyLjE2LTF2NS42WiIgZmlsbD0iIzk5OSIgLz48cGF0aCBpZD0iZWI5MjAwYTctNDY5My00NDI3LWJkYWUtYjMzY2U5MGZmN2YyIiBkPSJNOC42MSwxNi4zODlsLS4zMi0uMTZ2LTIuNzZsLjMyLS4xNVptLjc3LTMuNDUtLjM4LjE5djMuNDhsLjM3LjE5di0zLjg2WiIgZmlsbD0iI2IzYjNiMyIgLz48L3N2Zz4=',
  aks: 'data:image/svg+xml;base64,PHN2ZyBpZD0iYWY2YTJjNDItYmQ0OC00ODU3LWE0NzktYWVjZjhiM2RlNGY2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImI3MGM5Y2YxLWJhYjgtNDdlMC1iYmRiLWNlMWNkNjY0ZDI2OCIgeDE9IjIuOTQiIHkxPSIzLjc0IiB4Mj0iOC42NyIgeTI9IjMuNzQiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiNzdhZjQiIC8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzczYWRjIiAvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJiZWI2OTk1My1iZDk2LTQ1MTUtODg0My1hYzEyNTQ2YWY5MzYiIHgxPSI5LjEzIiB5MT0iMy43OSIgeDI9IjE0Ljg1IiB5Mj0iMy43OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2I3N2FmNCIgLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM3NzNhZGMiIC8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9ImEzOWM3NmU4LTU0N2UtNGViNC1iYzI1LWQ4MWMwZjhjZGE2MiIgeDE9IjAuMDEiIHkxPSI5LjEyIiB4Mj0iNS43MyIgeTI9IjkuMTIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiNzdhZjQiIC8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzczYWRjIiAvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJmMGEyYTQ5MS0xN2RjLTRiYjgtYmJmYy1lZTU4YTVjZjQ3ZGEiIHgxPSI2LjE4IiB5MT0iOS4wOCIgeDI9IjExLjkiIHkyPSI5LjA4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjYjc3YWY0IiAvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzc3M2FkYyIgLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZWZjNmE1NmQtODU4NS00MTdkLTkzMWEtMWRhYzIxMTRjY2QwIiB4MT0iMTIuMzUiIHkxPSI5LjEzIiB4Mj0iMTguMDgiIHkyPSI5LjEzIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjYjc3YWY0IiAvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzc3M2FkYyIgLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iZTM5OWFhOTMtMzQxZi00ZGYyLTljMDItNjAzYjgyYjQ4NGMyIiB4MT0iMi44NyIgeTE9IjE0LjU2IiB4Mj0iOC42IiB5Mj0iMTQuNTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNiNzdhZjQiIC8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNzczYWRjIiAvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJhMTUyYmJhMC1iYTJiLTQ4M2EtYjhjMS0wYWU3ZGUzNTU5OTAiIHgxPSI5LjA1IiB5MT0iMTQuNiIgeDI9IjE0Ljc4IiB5Mj0iMTQuNiIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2I3N2FmNCIgLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM3NzNhZGMiIC8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PHRpdGxlPkljb24tY29tcHV0ZS0yMzwvdGl0bGU+PHBvbHlnb24gcG9pbnRzPSI1LjggMS4yMiAyLjk0IDEuNzUgMi45NCA1LjY1IDUuOCA2LjI2IDguNjcgNS4xMSA4LjY3IDIuMiA1LjggMS4yMiIgZmlsbD0idXJsKCNiNzBjOWNmMS1iYWI4LTQ3ZTAtYmJkYi1jZTFjZDY2NGQyNjgpIiAvPjxwYXRoIGQ9Ik01LjkxLDYuMiw4LjUzLDUuMTRBLjIuMiwwLDAsMCw4LjY1LDVWMi4zNmEuMjEuMjEsMCwwLDAtLjEzLS4xOGwtMi42NS0uOUg1Ljc1bC0yLjYuNDhBLjIuMiwwLDAsMCwzLDEuOTRWNS40N2EuMTkuMTksMCwwLDAsLjE1LjE5bDIuNjMuNTVBLjMyLjMyLDAsMCwwLDUuOTEsNi4yWiIgZmlsbD0ibm9uZSIgLz48cGF0aCBkPSJNMi45NCwxLjc1djMuOWwyLjg5LjYxdi01Wm0xLjIyLDMuNi0uODEtLjE2di0zbC44MS0uMTNabTEuMjYuMjMtLjkzLS4xNVYybC45My0uMTZaIiBmaWxsPSIjMzQxYTZlIiAvPjxwb2x5Z29uIHBvaW50cz0iMTEuOTkgMS4yNyA5LjEzIDEuOCA5LjEzIDUuNyAxMS45OSA2LjMxIDE0Ljg1IDUuMTUgMTQuODUgMi4yNSAxMS45OSAxLjI3IiBmaWxsPSJ1cmwoI2JlYjY5OTUzLWJkOTYtNDUxNS04ODQzLWFjMTI1NDZhZjkzNikiIC8+PHBhdGggZD0iTTkuMTMsMS44VjUuN0wxMiw2LjMxdi01Wm0xLjIxLDMuNi0uODEtLjE2di0zbC44MS0uMTNabTEuMjYuMjMtLjkzLS4xNVYyLjA1bC45My0uMTdaIiBmaWxsPSIjMzQxYTZlIiAvPjxwb2x5Z29uIHBvaW50cz0iMi44NyA2LjYgMC4wMSA3LjEzIDAuMDEgMTEuMDMgMi44NyAxMS42NCA1Ljc0IDEwLjQ5IDUuNzQgNy41OCAyLjg3IDYuNiIgZmlsbD0idXJsKCNhMzljNzZlOC01NDdlLTRlYjQtYmMyNS1kODFjMGY4Y2RhNjIpIiAvPjxwYXRoIGQ9Ik0wLDcuMTNWMTFsMi44OS42MXYtNVptMS4yMSwzLjYxLS44MS0uMTd2LTNsLjgxLS4xNFpNMi40OCwxMWwtLjkzLS4xNVY3LjM4bC45My0uMTZaIiBmaWxsPSIjMzQxYTZlIiAvPjxwb2x5Z29uIHBvaW50cz0iOS4wNCA2LjU2IDYuMTggNy4wOSA2LjE4IDEwLjk5IDkuMDQgMTEuNjEgMTEuOSAxMC40NSAxMS45IDcuNTQgOS4wNCA2LjU2IiBmaWxsPSJ1cmwoI2YwYTJhNDkxLTE3ZGMtNGJiOC1iYmZjLWVlNThhNWNmNDdkYSkiIC8+PHBhdGggZD0iTTYuMTgsNy4wOVYxMWwyLjg4LjYxdi01Wk03LjM5LDEwLjdsLS44MS0uMTd2LTNsLjgxLS4xNFptMS4yNi4yMi0uOTMtLjE1VjcuMzRsLjkzLS4xNloiIGZpbGw9IiMzNDFhNmUiIC8+PHBvbHlnb24gcG9pbnRzPSIxNS4yMSA2LjYxIDEyLjM1IDcuMTQgMTIuMzUgMTEuMDQgMTUuMjEgMTEuNjUgMTguMDggMTAuNSAxOC4wOCA3LjU5IDE1LjIxIDYuNjEiIGZpbGw9InVybCgjZWZjNmE1NmQtODU4NS00MTdkLTkzMWEtMWRhYzIxMTRjY2QwKSIgLz48cGF0aCBkPSJNMTIuMzUsNy4xNFYxMWwyLjg5LjYxdi01Wm0xLjIyLDMuNjEtLjgxLS4xN3YtM2wuODEtLjE0Wm0xLjI2LjIyLS45My0uMTVWNy4zOWwuOTMtLjE2WiIgZmlsbD0iIzM0MWE2ZSIgLz48cG9seWdvbiBwb2ludHM9IjUuNzMgMTIuMDQgMi44NyAxMi41NiAyLjg3IDE2LjQ2IDUuNzMgMTcuMDggOC42IDE1LjkyIDguNiAxMy4wMiA1LjczIDEyLjA0IiBmaWxsPSJ1cmwoI2UzOTlhYTkzLTM0MWYtNGRmMi05YzAyLTYwM2I4MmI0ODRjMikiIC8+PHBhdGggZD0iTTUuODQsMTcsOC40NSwxNmEuMTguMTgsMCwwLDAsLjEyLS4xOHYtMi42QS4yLjIsMCwwLDAsOC40NCwxM0w1LjgsMTIuMWEuMTcuMTcsMCwwLDAtLjEyLDBsLTIuNi40N2EuMTkuMTksMCwwLDAtLjE2LjE5djMuNTRhLjE5LjE5LDAsMCwwLC4xNS4xOUw1LjcsMTdBLjIzLjIzLDAsMCwwLDUuODQsMTdaIiBmaWxsPSJub25lIiAvPjxwYXRoIGQ9Ik0yLjg3LDEyLjU2djMuOWwyLjg5LjYyVjEyWm0xLjIyLDMuNjFMMy4yOCwxNlYxM2wuODEtLjE0Wm0xLjI2LjIzLS45My0uMTVWMTIuODFsLjkzLS4xNloiIGZpbGw9IiMzNDFhNmUiIC8+PHBvbHlnb24gcG9pbnRzPSIxMS45MSAxMi4wOCA5LjA1IDEyLjYxIDkuMDUgMTYuNTEgMTEuOTEgMTcuMTIgMTQuNzggMTUuOTcgMTQuNzggMTMuMDYgMTEuOTEgMTIuMDgiIGZpbGw9InVybCgjYTE1MmJiYTAtYmEyYi00ODNhLWI4YzEtMGFlN2RlMzU1OTkwKSIgLz48cGF0aCBkPSJNOS4wNSwxMi42MXYzLjlsMi44OS42MXYtNVptMS4yMiwzLjYxLS44MS0uMTd2LTNsLjgxLS4xNFptMS4yNi4yMi0uOTMtLjE1VjEyLjg2bC45My0uMTZaIiBmaWxsPSIjMzQxYTZlIiAvPjwvc3ZnPg==',
  'azure-postgres': 'data:image/svg+xml;base64,PHN2ZyBpZD0iZmM4OTAxMjctNzI4Yi00YWMwLWI1ZGEtODZjZGZjMTkxZTg2IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImEyOGRlZTIwLTRjNzEtNDZiNS1iOTU3LTgwNGM2N2RhNzI1YSIgeDE9IjIuNDQiIHkxPSIxMC42NyIgeDI9IjE1LjI3IiB5Mj0iMTAuNjciIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMC4xNCAtMC41KSByb3RhdGUoLTAuMDEpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMDA1YmExIiAvPjxzdG9wIG9mZnNldD0iMC4wNyIgc3RvcC1jb2xvcj0iIzAwNjBhOSIgLz48c3RvcCBvZmZzZXQ9IjAuMzYiIHN0b3AtY29sb3I9IiMwMDcxYzgiIC8+PHN0b3Agb2Zmc2V0PSIwLjUyIiBzdG9wLWNvbG9yPSIjMDA3OGQ0IiAvPjxzdG9wIG9mZnNldD0iMC42NCIgc3RvcC1jb2xvcj0iIzAwNzRjZCIgLz48c3RvcCBvZmZzZXQ9IjAuODIiIHN0b3AtY29sb3I9IiMwMDZhYmIiIC8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDA1YmExIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjx0aXRsZT5JY29uLWRhdGFiYXNlcy0xMzE8L3RpdGxlPjxwYXRoIGQ9Ik05LDUuMTRjLTMuNTQsMC02LjQxLTEtNi40MS0yLjMyVjE1LjE4YzAsMS4yNywyLjgyLDIuMyw2LjMyLDIuMzJIOWMzLjU0LDAsNi40MS0xLDYuNDEtMi4zMlYyLjgyQzE1LjQxLDQuMSwxMi41NCw1LjE0LDksNS4xNFoiIGZpbGw9InVybCgjYTI4ZGVlMjAtNGM3MS00NmI1LWI5NTctODA0YzY3ZGE3MjVhKSIgLz48cGF0aCBkPSJNMTUuNDEsMi44MmMwLDEuMjgtMi44NywyLjMyLTYuNDEsMi4zMnMtNi40MS0xLTYuNDEtMi4zMlM1LjQ2LjUsOSwuNXM2LjQxLDEsNi40MSwyLjMyIiBmaWxsPSIjZThlOGU4IiAvPjxwYXRoIGQ9Ik0xMy45MSwyLjYzYzAsLjgyLTIuMiwxLjQ4LTQuOTEsMS40OFM0LjA4LDMuNDUsNC4wOCwyLjY0LDYuMjgsMS4xNiw5LDEuMTZzNC45MS42Niw0LjkxLDEuNDciIGZpbGw9IiM1MGU2ZmYiIC8+PHBhdGggZD0iTTksM2ExMS42NSwxMS42NSwwLDAsMC0zLjkuNTdBMTEuNTMsMTEuNTMsMCwwLDAsOSw0LjExYTExLjQ3LDExLjQ3LDAsMCwwLDMuODktLjU4QTExLjkzLDExLjkzLDAsMCwwLDksM1oiIGZpbGw9IiMxOThhYjMiIC8+PHBhdGggZD0iTTEyLDljMCwuMDgsMCwuMjQsMCwuNDJhNS4xMiw1LjEyLDAsMCwwLS4wOC42M2MwLC4xMiwwLC4zLjA1LjQ2czAsLjI3LDAsLjM2YTEuNjgsMS42OCwwLDAsMS0uMjUuODYuNDMuNDMsMCwwLDAsMCwuMDdsLjEuMTJhMTAuNTUsMTAuNTUsMCwwLDAsMS4wNi0yLjM4aDBjLjI4LS45NS4zMS0xLjYzLjA5LTEuOTJhMi41OCwyLjU4LDAsMCwwLTIuNjgtLjg2LDMuMjksMy4yOSwwLDAsMSwuOTEuNjdBMi4yOCwyLjI4LDAsMCwxLDEyLDlabS0uMzEuMDhhMS4xNSwxLjE1LDAsMCwwLS43OS4wOWMtLjI5LjE4LS4yLjU1LDAsMWE3Ljc3LDcuNzcsMCwwLDAsLjM1Ljg1bC4wOS4xNmgwYy4wNS4wOC4wOC4xNS4xMS4ybC4wOC4xM2ExLjI4LDEuMjgsMCwwLDAsLjE4LS42NSwyLjg2LDIuODYsMCwwLDAsMC0uMzNjMC0uMTcsMC0uMzYtLjA1LS40OWE2LjEsNi4xLDAsMCwxLC4wOC0uNjlDMTEuNzEsOS4yNCwxMS43Miw5LjEzLDExLjczLDkuMDVabS0uMy40MWEuNC40LDAsMCwxLS4xOC4xaDBhLjMzLjMzLDAsMCwxLS4xNCwwQS4yMy4yMywwLDAsMSwxMSw5LjRoMGMwLS4wNy4xMS0uMTMuMjQtLjE1aC4xOXMuMDksMCwuMDkuMDhBLjIuMiwwLDAsMSwxMS40Myw5LjQ2Wm0tNC42OS44OWMwLS4wNywwLS4xMywwLS4xN2ExLDEsMCwwLDAsMC0uMTcsNS41NSw1LjU1LDAsMCwxLDAtMUE1LjIyLDUuMjIsMCwwLDEsNyw3Ljk0LDIuNDEsMi40MSwwLDAsMSw3LjU4LDcsNC43OCw0Ljc4LDAsMCwwLDYuMjMsNi44YTEuODcsMS44NywwLDAsMC0xLjEuM0EyLDIsMCwwLDAsNC41LDguOTIsMTIuMjcsMTIuMjcsMCwwLDAsNSwxMS4xNmMuMzQsMS4xNC43MywxLjg0LDEuMDcsMS45NWgwYy4xNS4wNS4zMSwwLC40Ny0uMjEuMjgtLjM0LjU0LS42My42OS0uOEExLjg4LDEuODgsMCwwLDEsNi43NCwxMC4zNVptLjI2LjRhMi4xOCwyLjE4LDAsMCwwLC4wNi41NiwxLjUsMS41LDAsMCwwLC4yNi40NCwxLjA3LDEuMDcsMCwwLDAsLjM1LjI1LDEuMDksMS4wOSwwLDAsMCwuMzkuMDhjMC0uMTcuMTQtLjM4LjIzLS42YTQuMzUsNC4zNSwwLDAsMCwuMjEtLjU5LDYuNjEsNi42MSwwLDAsMCwwLTEuMTFjMC0uMDksMC0uMTktLjA2LS4zYS40NS40NSwwLDAsMC0uMTItLjI3bDAsMEEuNjYuNjYsMCwwLDAsOCw5LjA4SDcuOGExLjU2LDEuNTYsMCwwLDAtLjQ4LjE0QTIsMiwwLDAsMCw3LDkuNDF2LjExYzAsLjIsMCwuNDEsMCwuNjF2MGEuODYuODYsMCwwLDEsMCwuMTVsMCwuMzlIN1ptLjY2LTEuMzQsMCwwYS40Ni40NiwwLDAsMSwuMjgsMCwuNi42LDAsMCwxLC4xOS4wNmMuMDksMCwuMS4xMS4wOS4xNGgwYS4zNy4zNywwLDAsMS0uMTIuMTNBLjMuMywwLDAsMSw4LDkuNzNoMGEuMzQuMzQsMCwwLDEtLjI4LS4yOFptLjc0LDNhLjIzLjIzLDAsMCwwLS4xMy4wNmwtLjE0LjE3Yy0uMTcuMjEtLjI0LjI4LS43My4zOGEuNTIuNTIsMCwwLDAtLjI2LjEuNTguNTgsMCwwLDAsLjI0LjExLDEuMTgsMS4xOCwwLDAsMCwuNzIsMEExLjcsMS43LDAsMCwwLDguNDUsMTNhLjYxLjYxLDAsMCwwLC4yLS4zMS4zNi4zNiwwLDAsMC0uMS0uMjhBLjE1LjE1LDAsMCwwLDguNCwxMi4zOVptNC42MSwwYTEuNjMsMS42MywwLDAsMS0xLjEzLDAsLjIyLjIyLDAsMCwwLS4xNCwwLC4zLjMsMCwwLDAtLjE3LjE0LDEuMDksMS4wOSwwLDAsMCwwLC4zMSwxLjgsMS44LDAsMCwwLDEuMS0uMSwxLjM2LDEuMzYsMCwwLDAsLjQ4LS4zNFptLTIuNC0yLjE0Yy0uMTQtLjQxLS4zNC0xLC4xOC0xLjM2YTEuMzUsMS4zNSwwLDAsMSwuODktLjE1QTMuMTgsMy4xOCwwLDAsMCwxMSw3LjY0bC0uMS0uMS0uMDYtLjA2aDBhLjM0LjM0LDAsMCwwLS4wNi0uMDZsMCwwLDAsMEEyLjM0LDIuMzQsMCwwLDAsMTAuMTEsNywyLjYzLDIuNjMsMCwwLDAsOSw2Ljc4YTEuNTIsMS41MiwwLDAsMC0uNy4xMUExLjc3LDEuNzcsMCwwLDAsOCw3YTIuMSwyLjEsMCwwLDAtLjc0LDEsNS44NCw1Ljg0LDAsMCwwLS4yMSwxLDEuNjYsMS42NiwwLDAsMSwxLS4yMy44NC44NCwwLDAsMSwuNzcuOTEsNy4yNiw3LjI2LDAsMCwxLDAsMS4yNywzLjg3LDMuODcsMCwwLDEtLjIzLjYzYy0uMDYuMTctLjE0LjM1LS4xOC40OWEuNS41LDAsMCwxLC4zOC4xNC42Ni42NiwwLDAsMSwuMTkuNTNIOWMwLC4wOCwwLC4xNiwwLC4yNGE2LjU1LDYuNTUsMCwwLDAsLjI0LDIuNDQuNTQuNTQsMCwwLDAsLjI0LjIxLjYuNiwwLDAsMCwuMzEuMSwxLjMsMS4zLDAsMCwwLDEtLjM0LDEuMDUsMS4wNSwwLDAsMCwuMjktLjY2Yy4wNy0uNDUuMjItMS43LjI0LTJoMGEuNzIuNzIsMCwwLDEsLjA5LS40NC42My42MywwLDAsMSwuMjctLjI0QTUuMzYsNS4zNiwwLDAsMSwxMC42MSwxMC4yNFoiIGZpbGw9IiNmMmYyZjIiIC8+PC9zdmc+',
  'azure-redis': 'data:image/svg+xml;base64,PHN2ZyBpZD0idXVpZC04ZTQ5ODc4ZS02ZjFlLTQ1ZGMtYjEzZi1kZTNmM2IwYTMwMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMTggMTgiPjxkZWZzPjxsaW5lYXJHcmFkaWVudCBpZD0idXVpZC1lMjc1MjAwZi04MDQ3LTQ4M2QtOTE2NS0zMzU4ODFkYzA0OTIiIHgxPSIuNTYyIiB5MT0iMi42ODQiIHgyPSIxNy41NjEiIHkyPSIxOS40MzciIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAyMCkgc2NhbGUoMSAtMSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM3NTc1NzUiIC8+PHN0b3Agb2Zmc2V0PSIuOTE1IiBzdG9wLWNvbG9yPSIjYjBiMGIwIiAvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IGlkPSJ1dWlkLWE4NDY3OTg4LWZiODEtNDdhOS05MzAwLTRmYWM5ZGNiOTdhNCIgeDE9IjEzLjMyMSIgeTE9IjE1LjMzOSIgeDI9IjQuNTgxIiB5Mj0iNi41NjMiIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAyMCkgc2NhbGUoMSAtMSkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMDc4ZDQiIC8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMDA1YmExIiAvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxwYXRoIGQ9Ik05LC41Yy4yNzYsMCwuNS4yMjQuNS41djFoMnYtMWMwLS4yNzYuMjI0LS41LjUtLjVzLjUuMjI0LjUuNXYxaDEuNWMxLjEwNSwwLDIsLjg5NSwyLDJ2MS41aDFjLjI3NiwwLC41LjIyNC41LjVzLS4yMjQuNS0uNS41aC0xdjJoMWMuMjc2LDAsLjUuMjI0LjUuNXMtLjIyNC41LS41LjVoLTF2MmgxYy4yNzYsMCwuNS4yMjQuNS41cy0uMjI0LjUtLjUuNWgtMXYxLjVjMCwxLjEwNS0uODk1LDItMiwyaC0xLjV2MWMwLC4yNzYtLjIyNC41LS41LjVzLS41LS4yMjQtLjUtLjV2LTFoLTJ2MWMwLC4yNzYtLjIyNC41LS41LjVzLS41LS4yMjQtLjUtLjV2LTFoLTJ2MWMwLC4yNzYtLjIyNC41LS41LjVzLS41LS4yMjQtLjUtLjV2LTFoLTEuNWMtMS4xMDUsMC0yLS44OTUtMi0ydi0xLjVoLTFjLS4yNzYsMC0uNS0uMjI0LS41LS41cy4yMjQtLjUuNS0uNWgxdi0yaC0xYy0uMjc2LDAtLjUtLjIyNC0uNS0uNXMuMjI0LS41LjUtLjVoMXYtMmgtMWMtLjI3NiwwLS41LS4yMjQtLjUtLjVzLjIyNC0uNS41LS41aDF2LTEuNWMwLTEuMTA1Ljg5NS0yLDItMmgxLjV2LTFjMC0uMjc2LjIyNC0uNS41LS41cy41LjIyNC41LjV2MWgydi0xYzAtLjI3Ni4yMjQtLjUuNS0uNVpNOC45ODQsM2gtMi45NjhjLS4wMDUsMC0uMDEsMC0uMDE2LDBzLS4wMTEsMC0uMDE2LDBoLTEuOTg0Yy0uNTUyLDAtMSwuNDQ4LTEsMXYxMGMwLC41NTIuNDQ4LDEsMSwxaDEuOTg0Yy4wMDUsMCwuMDEsMCwuMDE2LDBzLjAxMSwwLC4wMTYsMGgyLjk2OGMuMDA1LDAsLjAxLDAsLjAxNiwwcy4wMTEsMCwuMDE2LDBoMi45NjhjLjAwNSwwLC4wMSwwLC4wMTYsMCwuMDA1LDAsLjAxLDAsLjAxNiwwaDEuOTg0Yy41NTIsMCwxLS40NDgsMS0xdi0xLjk3OGMwLS4wMDcsMC0uMDE1LDAtLjAyMnMwLS4wMTUsMC0uMDIydi0yLjk1NWMwLS4wMDcsMC0uMDE1LDAtLjAyMnMwLS4wMTUsMC0uMDIydi0yLjk1NWMwLS4wMDcsMC0uMDE1LDAtLjAyMnMwLS4wMTUsMC0uMDIydi0xLjk3OGMwLS41NTItLjQ0OC0xLTEtMWgtMS45ODRjLS4wMDUsMC0uMDEsMC0uMDE2LDAtLjAwNSwwLS4wMTEsMC0uMDE2LDBoLTIuOTY4Yy0uMDA1LDAtLjAxLDAtLjAxNiwwcy0uMDExLDAtLjAxNiwwWiIgZmlsbD0idXJsKCN1dWlkLWUyNzUyMDBmLTgwNDctNDgzZC05MTY1LTMzNTg4MWRjMDQ5MikiIGZpbGwtcnVsZT0iZXZlbm9kZCIgLz48cmVjdCB4PSI0IiB5PSI0IiB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHJ4PSIuNSIgcnk9Ii41IiBmaWxsPSJ1cmwoI3V1aWQtYTg0Njc5ODgtZmI4MS00N2E5LTkzMDAtNGZhYzlkY2I5N2E0KSIgLz48cGF0aCBkPSJNMTIuMTI0LDkuMzFjLS40ODQuNTY3LTEuMDA3LDEuMjE0LTIuMDUzLDEuMjE0LS45MzQsMC0xLjI4Mi0uNzY1LTEuMzA3LTEuMzg3LjIwNS40MDIuNjA1LjcyOCwxLjIyOS43MTMsMS4yMDEtLjAzNiwyLjAyNC0xLjA0MywyLjAyNC0xLjk2MSwwLTEuMDk3LS44ODEtMS44ODktMi40MTEtMS44ODktMS4wOTQsMC0yLjQ1LjM4Ny0zLjM0MS45OTgtLjAxLjYzLjM2OCwxLjQ0OC41MDQsMS4zNTguNzcyLS41MTYsMS4zODUtLjg0OCwxLjk3OS0xLjAxNC0uODc5LjkxMS0yLjk4OSwzLjAyNi0zLjI0OCwzLjM5OC4wMjkuMzQyLjQ4NCwxLjI1OS43MDcsMS4yNTkuMDY4LDAsLjEyNi0uMDM2LjE5NC0uMDk5LjYzNi0uNjY0LDEuMTU1LTEuMjU5LDEuNjE2LTEuODMzLjA2NS44NDEuNTEsMS44NjksMS43NTQsMS44NjksMS4xMTQsMCwyLjIxOC0uNzQ3LDIuNzIxLTIuNDI5LjA1OC0uMjA3LS4yMTMtLjM2OS0uMzY4LS4xOThaTTEwLjg1NSw3Ljk1MmMwLC41MzEtLjU2Mi43OTItMS4wNzUuNzkyLS4yNzQsMC0uNDg1LS4wNjctLjY1Mi0uMTU0LjMwNy0uNDMxLjYxLS44NzQuOTM2LTEuMzQ3LjU3NS4wOS43OS4zODcuNzkuNzA5WiIgZmlsbD0iI2ZmZiIgLz48L3N2Zz4=',
  'azure-openai': 'data:image/svg+xml;base64,PHN2ZyBpZD0idXVpZC1hZGJkYWU4ZS01YTQxLTQ2ZDEtOGMxOC1hYTczY2RiZmVlMzIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiB2aWV3Qm94PSIwIDAgMTggMTgiPjxkZWZzPjxyYWRpYWxHcmFkaWVudCBpZD0idXVpZC0yYTc0MDdhYS1iNzg3LTQ4ZGQtYTk2YS0wZDgxYWI2ZTkzYmIiIGN4PSItNjcuOTgxIiBjeT0iNzkzLjE5OSIgcj0iLjQ1IiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzkzOS4wMyAyMDM2OC4wMjkpIHJvdGF0ZSg0NSkgc2NhbGUoMjUuMDkxIC0zNC4xNDkpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjODNiOWY5IiAvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwNzhkNCIgLz48L3JhZGlhbEdyYWRpZW50PjwvZGVmcz48cGF0aCBkPSJtMCwyLjd2MTIuNmMwLDEuNDkxLDEuMjA5LDIuNywyLjcsMi43aDEyLjZjMS40OTEsMCwyLjctMS4yMDksMi43LTIuN1YyLjdjMC0xLjQ5MS0xLjIwOS0yLjctMi43LTIuN0gyLjdDMS4yMDksMCwwLDEuMjA5LDAsMi43Wk0xMC44LDB2My42YzAsMy45NzYsMy4yMjQsNy4yLDcuMiw3LjJoLTMuNmMtMy45NzYsMC03LjE5OSwzLjIyMi03LjIsNy4xOTh2LTMuNTk4YzAtMy45NzYtMy4yMjQtNy4yLTcuMi03LjJoMy42YzMuOTc2LDAsNy4yLTMuMjI0LDcuMi03LjJaIiBmaWxsPSJ1cmwoI3V1aWQtMmE3NDA3YWEtYjc4Ny00OGRkLWE5NmEtMGQ4MWFiNmU5M2JiKSIgc3Ryb2tlLXdpZHRoPSIwIiAvPjwvc3ZnPg==',
  'azure-monitor': 'data:image/svg+xml;base64,PHN2ZyBpZD0iZTRlNzY0Y2QtMmU3My00NzJmLWI4OGEtYmY4YmZjMmMyOTk0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij48ZGVmcz48cmFkaWFsR3JhZGllbnQgaWQ9ImFjOGIzMmRhLTMwY2EtNGI5Mi04ZDBmLThkMmQ1ZWYyNzhhMCIgY3g9IjUuNzIiIGN5PSI3LjQ1IiByPSI4LjQyIiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDMuMjMgMS41MSkgc2NhbGUoMS4wMSAxLjAxKSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPjxzdG9wIG9mZnNldD0iMC4xOCIgc3RvcC1jb2xvcj0iIzVlYTBlZiIgLz48c3RvcCBvZmZzZXQ9IjAuNTYiIHN0b3AtY29sb3I9IiM1YzlmZWUiIC8+PHN0b3Agb2Zmc2V0PSIwLjY5IiBzdG9wLWNvbG9yPSIjNTU5Y2VkIiAvPjxzdG9wIG9mZnNldD0iMC43OCIgc3RvcC1jb2xvcj0iIzRhOTdlOSIgLz48c3RvcCBvZmZzZXQ9IjAuODYiIHN0b3AtY29sb3I9IiMzOTkwZTQiIC8+PHN0b3Agb2Zmc2V0PSIwLjkzIiBzdG9wLWNvbG9yPSIjMjM4N2RlIiAvPjxzdG9wIG9mZnNldD0iMC45OSIgc3RvcC1jb2xvcj0iIzA4N2JkNiIgLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwMDc4ZDQiIC8+PC9yYWRpYWxHcmFkaWVudD48cmFkaWFsR3JhZGllbnQgaWQ9ImE5OTU0ODIwLWNiMzgtNDk0My05ODQyLWYwYTU2OGQyYjAxNSIgY3g9IjI4LjE4IiBjeT0iMjAyLjI5IiByPSIyLjciIGdyYWRpZW50VHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Ljc3IC0xODUuMDEpIHNjYWxlKDAuOTUpIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHN0b3Agb2Zmc2V0PSIwLjE5IiBzdG9wLWNvbG9yPSIjOGM4ZTkwIiAvPjxzdG9wIG9mZnNldD0iMC4zNSIgc3RvcC1jb2xvcj0iIzg0ODY4OCIgLz48c3RvcCBvZmZzZXQ9IjAuNiIgc3RvcC1jb2xvcj0iIzZlNzA3MSIgLz48c3RvcCBvZmZzZXQ9IjAuOTEiIHN0b3AtY29sb3I9IiM0YTRiNGMiIC8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjM2UzZjNmIiAvPjwvcmFkaWFsR3JhZGllbnQ+PC9kZWZzPjx0aXRsZT5JY29uLW1hbmFnZS0zMTc8L3RpdGxlPjxlbGxpcHNlIGN4PSI5IiBjeT0iOSIgcng9IjguNSIgcnk9IjguNDciIGZpbGw9InVybCgjYWM4YjMyZGEtMzBjYS00YjkyLThkMGYtOGQyZDVlZjI3OGEwKSIgLz48ZWxsaXBzZSBjeD0iOSIgY3k9IjkiIHJ4PSI3LjQiIHJ5PSI3LjM3IiBmaWxsPSIjZmZmIiAvPjxwYXRoIGQ9Ik0yLjcyLDkuNDRhNi4yNCw2LjI0LDAsMCwwLDEuODIsNGwyLTJhMy41MywzLjUzLDAsMCwxLTEtMloiIGZpbGw9IiM5Y2ViZmYiIC8+PHBhdGggZD0iTTEzLjEzLDQuMjdBNi4yNSw2LjI1LDAsMCwwLDkuNDQsMi43NFY1LjUzYTMuNDEsMy40MSwwLDAsMSwxLjcxLjdaIiBmaWxsPSIjMzJiZWRkIiAvPjxwYXRoIGQ9Ik00Ljg3LDQuMjdsMiwyYTMuNDEsMy40MSwwLDAsMSwxLjcxLS43VjIuNzRBNi4yNSw2LjI1LDAsMCwwLDQuODcsNC4yN1oiIGZpbGw9IiMzMmJlZGQiIC8+PHBhdGggZD0iTTExLjc4LDYuODVhMy42LDMuNiwwLDAsMSwuNzEsMS43MWgyLjc5YTYuMTYsNi4xNiwwLDAsMC0xLjUzLTMuNjdaIiBmaWxsPSIjMzJiZWRkIiAvPjxwYXRoIGQ9Ik02LjIyLDYuODVsLTItMkE2LjE2LDYuMTYsMCwwLDAsMi43Miw4LjU2SDUuNTFBMy42LDMuNiwwLDAsMSw2LjIyLDYuODVaIiBmaWxsPSIjNTBlNmZmIiAvPjxwYXRoIGQ9Ik0xNC4xNCw3YS40NS40NSwwLDAsMC0uNTctLjI1TDkuNDUsOC40MWwuMzIuODEsNC4xMi0xLjYzQS40NC40NCwwLDAsMCwxNC4xNCw3WiIgZmlsbD0iI2YwNDA0OSIgLz48ZWxsaXBzZSBjeD0iOSIgY3k9IjkiIHJ4PSIxLjIiIHJ5PSIxLjIiIGZpbGw9InVybCgjYTk5NTQ4MjAtY2IzOC00OTQzLTk4NDItZjBhNTY4ZDJiMDE1KSIgLz48L3N2Zz4=',
}

const simpleIconUrl = (slug: string) => `https://cdn.jsdelivr.net/npm/simple-icons@v15/icons/${slug}.svg`
const azureLogoUrl = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg'

Object.assign(logoUrls, {
  bullmq: 'https://bullmq.io/images/bullmq-logo.png',
  acr: azureLogoUrl,
  aks: azureLogoUrl,
  'azure-postgres': simpleIconUrl('postgresql'),
  'azure-redis': simpleIconUrl('redis'),
  'azure-openai': simpleIconUrl('openai'),
  'azure-monitor': azureLogoUrl,
})

function Flow({ d, color = '#3278bd', delay = 0, reverse = false }: FlowProps) {
  return (
    <g aria-hidden="true">
      <path d={d} fill="none" stroke="#a8b6c2" strokeWidth="1.5" strokeLinecap="round" />
      <path d={d} fill="none" stroke={color} strokeOpacity=".12" strokeWidth="6" strokeLinecap="round" />
      <motion.circle
        r="3.5"
        fill={color}
        initial={{ offsetDistance: reverse ? '100%' : '0%', opacity: 0 }}
        animate={{ offsetDistance: reverse ? ['100%', '0%'] : ['0%', '100%'], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 3.6, delay, repeat: Infinity, ease: 'linear', times: [0, .12, .86, 1] }}
        style={{ offsetPath: `path('${d}')` } as MotionStyle}
      />
    </g>
  )
}

function Card({ x, y, w, h, title, lines, accent = '#3278bd', logos = [] }: {
  x: number; y: number; w: number; h: number; title: string; lines: string[]; accent?: string; logos?: string[]
}) {
  const logoSize = h <= 60 ? 22 : 36
  const logoGap = h <= 45 ? 8 : 14
  const logoRowWidth = logos.length * logoSize + Math.max(0, logos.length - 1) * logoGap
  const firstLogoX = x + (w - logoRowWidth) / 2
  const logoY = h <= 60 ? y + 29 : y + 36
  return (
    <g aria-label={`${title}: ${lines.join(', ')}`}>
      <rect x={x} y={y} width={w} height={h} rx="12" fill="#fff" stroke="#c5d0da" strokeWidth="1.4" />
      <path d={`M${x + 12} ${y}h${w - 24}`} stroke={accent} strokeWidth="3" strokeLinecap="round" />
      <text x={x + 16} y={y + 25} className="arch-card-title">{title}</text>
      {logos.map((logo, index) => (
        <image
          key={`${title}-logo-${logo}`}
          href={logoUrls[logo]}
          x={firstLogoX + index * (logoSize + logoGap)}
          y={logoY}
          width={logoSize}
          height={logoSize}
          preserveAspectRatio="xMidYMid meet"
          aria-label={`${logo} logo`}
        />
      ))}
    </g>
  )
}

function LaneLabel({ x, y, children }: { x: number; y: number; children: string }) {
  return <text x={x} y={y} className="arch-lane-label">{children}</text>
}

export default function ArchitecturePreview({ style }: ArchitecturePreviewProps) {
  // Smooth and cap the scale passed by the scroll-owning parent.
  const incomingScale = style?.scale
  const scaleSource = useMotionValue(typeof incomingScale === 'number' ? incomingScale : 1)

  useEffect(() => {
    if (typeof incomingScale === 'number') {
      scaleSource.set(incomingScale)
      return
    }
    if (incomingScale && typeof incomingScale === 'object' && 'on' in incomingScale) {
      return (incomingScale as MotionValue<number>).on('change', (value) => scaleSource.set(value))
    }
  }, [incomingScale, scaleSource])

  const cappedScale = useTransform(scaleSource, (value) => Math.min(value, 1.04))
  const smoothScale = useSpring(cappedScale, { stiffness: 120, damping: 28, mass: 0.8 })
  const diagramStyle: MotionStyle = { ...style, scale: smoothScale, transformOrigin: 'center center' }

  return (
    <motion.div className="architecture-diagram" style={diagramStyle} aria-label="Project architecture using Next.js, NestJS, and Azure services">
      <svg viewBox="0 0 1200 740" role="img" aria-labelledby="architecture-title">
        <title id="architecture-title">Current project architecture — Next.js, NestJS, and Azure cloud services</title>
        <defs>
          <pattern id="architecture-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="#e6edf3" strokeWidth=".65" />
          </pattern>
          <marker id="arrow-start" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M8 0 0 4l8 4" fill="none" stroke="#7e8d99" strokeWidth="1.2" />
          </marker>
          <marker id="arrow-end" viewBox="0 0 8 8" refX="4" refY="4" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M0 0 8 4 0 8" fill="none" stroke="#7e8d99" strokeWidth="1.2" />
          </marker>
        </defs>
        <rect width="1200" height="740" fill="url(#architecture-grid)" opacity=".55" />
        <text x="40" y="42" className="arch-kicker">PLATFORM ARCHITECTURE</text>
        <text x="1160" y="42" textAnchor="end" className="arch-kicker">AZURE · CLOUD-NATIVE</text>

        <LaneLabel x={40} y={91}>APPLICATION</LaneLabel>
        <LaneLabel x={40} y={268}>CONTAINER PLATFORM</LaneLabel>
        <LaneLabel x={40} y={466}>DATA &amp; INTEGRATIONS</LaneLabel>
        <LaneLabel x={40} y={666}>OPERATIONS</LaneLabel>
        <path d="M40 103H1160M40 280H1160M40 478H1160M40 678H1160" stroke="#e1e8ee" strokeWidth="1" />

        {/* Bidirectional and workload paths; particles keep each relationship alive. */}
        <g fill="none" stroke="#7e8d99" strokeWidth="1.35" markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)">
          <path d="M600 205V226" />
          <path d="M700 166H827" />
          <path d="M600 205V250H250V315" />
          <path d="M927 205V250H250V315" />
          <path d="M330 357H442" />
          <path d="M610 357H722" />
          <path d="M1000 315V292H990V205" />
          <path d="M810 398V438H217V499" />
          <path d="M850 398V438H437V499" />
          <path d="M890 398V438H657V499" />
          <path d="M930 398V438H877V499" />
          <path d="M800 398V642H600V699" />
        </g>
        <Flow d="M600 205V226" color="#2879bd" />
        <Flow d="M700 166H827" color="#2879bd" delay={0.25} />
        <Flow d="M600 205V250H250V315" color="#258b74" delay={0.45} />
        <Flow d="M927 205V250H250V315" color="#258b74" delay={0.7} reverse />
        <Flow d="M330 357H442" color="#e28a32" delay={0.9} />
        <Flow d="M610 357H722" color="#e28a32" delay={1.1} />
        <Flow d="M1000 315V292H990V205" color="#876bc0" delay={1.3} reverse />
        <Flow d="M810 398V438H217V499" color="#3a8e77" delay={1.5} />
        <Flow d="M850 398V438H437V499" color="#d09a27" delay={1.7} reverse />
        <Flow d="M890 398V438H657V499" color="#557eaf" delay={1.9} />
        <Flow d="M930 398V438H877V499" color="#856ab2" delay={2.1} reverse />
        <Flow d="M800 398V642H600V699" color="#e17840" delay={2.3} />

        <Card x={500} y={120} w={200} h={85} title="FRONTEND" lines={['Next.js']} accent="#111827" logos={['nextdotjs']} />
        <Card x={827} y={120} w={200} h={85} title="API" lines={['NestJS']} accent="#dc3150" logos={['nestjs']} />
        <Card x={80} y={120} w={250} h={85} title="BACKGROUND WORKERS" lines={['NestJS workers', 'BullMQ job processing']} accent="#9b4d96" logos={['nestjs', 'bullmq']} />
        <path d="M700 166H827" fill="none" stroke="#7e8d99" strokeWidth="1.35" markerStart="url(#arrow-start)" markerEnd="url(#arrow-end)" />
        <text x="762" y="154" textAnchor="middle" className="arch-link-label">API calls</text>

        <Card x={170} y={315} w={160} h={83} title="CONTAINERS" lines={['Docker']} accent="#2496ed" logos={['docker']} />
        <Card x={442} y={315} w={168} h={83} title="IMAGE REGISTRY" lines={['Azure Container Registry', '(ACR)']} accent="#1687c9" logos={['acr']} />
        <Card x={722} y={315} w={220} h={83} title="ORCHESTRATION" lines={['Azure Kubernetes Service', '(AKS)']} accent="#326ce5" logos={['aks']} />
        <Card x={980} y={315} w={180} h={83} title="INFRASTRUCTURE" lines={['Terraform · IaC']} accent="#7545a5" logos={['terraform']} />
        <text x="386" y="345" textAnchor="middle" className="arch-link-label">build &amp; push</text>
        <text x="666" y="345" textAnchor="middle" className="arch-link-label">pull &amp; deploy</text>

        <Card x={112} y={499} w={210} h={91} title="DATABASE" lines={['Azure Database for', 'PostgreSQL']} accent="#2869a5" logos={['postgresql', 'azure-postgres']} />
        <Card x={332} y={499} w={210} h={91} title="QUEUE / CACHE" lines={['Redis', 'Azure Cache for Redis']} accent="#d94343" logos={['redis', 'azure-redis']} />
        <Card x={552} y={499} w={210} h={91} title="STORAGE / AUTH" lines={['Supabase', 'or Azure equivalents']} accent="#37a879" logos={['supabase']} />
        <Card x={772} y={499} w={210} h={91} title="AI PROVIDER" lines={['OpenRouter', 'or Azure OpenAI']} accent="#7855bb" logos={['openrouter', 'openai', 'azure-openai']} />
        <text x="1085" y="540" textAnchor="middle" className="arch-side-note">Services used</text>
        <text x="1085" y="558" textAnchor="middle" className="arch-side-note">by AKS workloads</text>

        <Card x={390} y={680} w={420} h={55} title="MONITORING" lines={["Prometheus · Grafana · Azure Monitor"]} accent="#e17840" logos={["prometheus", "grafana", "azure-monitor"]} />
        <text x="1045" y="715" textAnchor="middle" className="arch-side-note">Terraform provisions</text>
        <text x="1045" y="731" textAnchor="middle" className="arch-side-note">the Azure platform</text>
      </svg>
      <style>{`
        .architecture-diagram { width: 100%; max-width: 1000px; margin-inline: auto; overflow: hidden; }
        .architecture-diagram svg { display: block; width: 100%; height: auto; }
        .arch-kicker { fill: #617181; font: 700 11px Inter, ui-sans-serif, system-ui, sans-serif; letter-spacing: 1.4px; }
        .arch-lane-label { fill: #8b98a4; font: 700 10px Inter, ui-sans-serif, system-ui, sans-serif; letter-spacing: 1px; }
        .arch-card-title { fill: #778591; font: 700 9px Inter, ui-sans-serif, system-ui, sans-serif; letter-spacing: .8px; }
        .arch-link-label { fill: #87939e; font: 500 9px Inter, ui-sans-serif, system-ui, sans-serif; }
        .arch-side-note { fill: #7b8792; font: 500 10px Inter, ui-sans-serif, system-ui, sans-serif; }
      `}</style>
    </motion.div>
  )
}
