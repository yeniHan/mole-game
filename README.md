# 두더지 잡기 게임

## 두더지 출현 로직
* useMoleGenerator()라는 hook을 통해 출현 시간(1-3초), 출현하는 두더지 마릿수(1-5마리), 출현 하는 두더지 위치(1-24개중 선택)를 랜덤 설정
* useMoleGenerator()는 두더지가 generate될때마다, trigger(from useRerenderTrigger())를 업데이트하고, 제한시간이 지나기 전까지, trigger가 업데이트 될때마다, 다음 출현할 두더지를 generate한다.

## 점수 및 제한 시간 유지 
* 게임 진행중에, session storage에 현재 점수와 남은 시간을 저장하여, 탭을 종료하지 않는 한, 게임 도중 새로고침한 경우, 진행 중이었던 플레이가 자동으로 이어서 진행됨.

## Timer hook
* setInterval, setTimeout등을 저장하기 위해, useRef()를 사용해야하는 데, 이는 가독성을 떨어뜨릴 수 있으므로, custom hook으로, useIntervalRef(), useTimeoutRef()를 만들어 사용함
