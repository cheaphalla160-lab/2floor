import React, { useEffect, useState } from 'react';
import { TargetItemType, FloorType, ActiveItem, GameSpeed } from '../types/game';
import { ROOM_SPOTS, SPEED_CONFIGS } from '../data/gameData';
import { soundCtrl } from '../utils/audio';
import { CostumeVector, FilmVector, DetectiveFoxVector } from './VectorIcons';
import { Volume2, Sparkles, Film, Shirt, Layers, Compass } from 'lucide-react';

interface BuildingStageProps {
  speed: GameSpeed;
  isPlaying: boolean;
  onFindItem: (
    itemType: TargetItemType,
    floor: FloorType,
    roomName: string,
    roomNameZh: string,
    spotNameZh: string
  ) => void;
  onMissClick?: () => void;
}

export const BuildingStage: React.FC<BuildingStageProps> = ({
  speed,
  isPlaying,
  onFindItem,
  onMissClick,
}) => {
  const [activeItems, setActiveItems] = useState<ActiveItem[]>([]);
  const [distractorSpotId, setDistractorSpotId] = useState<string | null>(null);
  const [floorViewMode, setFloorViewMode] = useState<'all' | '3F' | '2F'>('all');

  // Spawn and shuffle items across 2F and 3F
  useEffect(() => {
    if (!isPlaying) return;

    const intervalMs = SPEED_CONFIGS[speed].intervalMs;

    const spawnItems = () => {
      const shuffledSpots = [...ROOM_SPOTS].sort(() => 0.5 - Math.random());
      const newItems: ActiveItem[] = [];

      // Filter spots based on view mode if focused
      const availableSpots =
        floorViewMode === 'all'
          ? shuffledSpots
          : shuffledSpots.filter((s) =>
              floorViewMode === '3F' ? s.floor === 'third floor' : s.floor === 'second floor'
            );

      const showCostume = Math.random() < 0.92;
      const showFilm = Math.random() < 0.92;

      let spotIndex = 0;

      if (showCostume && availableSpots[spotIndex]) {
        const spot = availableSpots[spotIndex];
        newItems.push({
          id: `costume-${Date.now()}`,
          type: 'costume',
          floor: spot.floor,
          spotId: spot.id,
          revealed: true,
          peeking: Math.random() > 0.5,
          spawnTime: Date.now(),
        });
        spotIndex++;
      }

      if (showFilm && availableSpots[spotIndex]) {
        const spot = availableSpots[spotIndex];
        newItems.push({
          id: `film-${Date.now()}`,
          type: 'film',
          floor: spot.floor,
          spotId: spot.id,
          revealed: true,
          peeking: Math.random() > 0.5,
          spawnTime: Date.now(),
        });
        spotIndex++;
      }

      // Random friendly star distractor
      if (Math.random() < 0.35 && availableSpots[spotIndex]) {
        setDistractorSpotId(availableSpots[spotIndex].id);
      } else {
        setDistractorSpotId(null);
      }

      setActiveItems(newItems);
      soundCtrl.playPop();
    };

    spawnItems();
    const timer = setInterval(spawnItems, intervalMs);
    return () => clearInterval(timer);
  }, [isPlaying, speed, floorViewMode]);

  const handleItemClick = (e: React.MouseEvent, item: ActiveItem) => {
    e.stopPropagation();
    const spot = ROOM_SPOTS.find((s) => s.id === item.spotId);
    if (!spot) return;

    soundCtrl.playFoundSuccess();
    setActiveItems((prev) => prev.filter((i) => i.id !== item.id));
    onFindItem(item.type, spot.floor, spot.roomName, spot.roomNameZh, spot.spotNameZh);
  };

  const handleSpeakFloor = (floor: 'second floor' | 'third floor') => {
    soundCtrl.playTap();
    soundCtrl.speak(`The ${floor}!`, { rate: 0.8 });
  };

  const thirdFloorRooms = [
    {
      id: 'cinema',
      name: 'Cinema Screening Room',
      nameZh: '影院放映厅',
      themeColor: 'border-indigo-300 bg-indigo-50/70',
      icon: '🎬',
      decor: '🍿 Movie Screen & Projector',
      spots: ROOM_SPOTS.filter((s) => s.floor === 'third floor' && s.roomId === 'cinema'),
    },
    {
      id: 'studio',
      name: 'Film Studio',
      nameZh: '胶片剪辑室',
      themeColor: 'border-sky-300 bg-sky-50/70',
      icon: '🎞️',
      decor: '📼 Light Table & Reels',
      spots: ROOM_SPOTS.filter((s) => s.floor === 'third floor' && s.roomId === 'studio'),
    },
  ];

  const secondFloorRooms = [
    {
      id: 'stage',
      name: 'Drama Stage',
      nameZh: '小剧场舞台',
      themeColor: 'border-rose-300 bg-rose-50/70',
      icon: '🎪',
      decor: '✨ Red Velvet Curtains',
      spots: ROOM_SPOTS.filter((s) => s.floor === 'second floor' && s.roomId === 'stage'),
    },
    {
      id: 'wardrobe',
      name: 'Costume & Wardrobe Room',
      nameZh: '戏服更衣室',
      themeColor: 'border-amber-300 bg-amber-50/70',
      icon: '👗',
      decor: '👑 Royal Closet & Mirrors',
      spots: ROOM_SPOTS.filter((s) => s.floor === 'second floor' && s.roomId === 'wardrobe'),
    },
  ];

  return (
    <div className="w-full space-y-4">
      {/* Top View Mode Selector & Floor Distinguisher Bar */}
      <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-sm">
            <Compass className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
              Floor Navigator (简洁楼层导航)
            </h3>
            <p className="text-[11px] text-slate-500">
              三楼 3F（电影与胶片）在上方 · 二楼 2F（舞台与戏服）在中间 · 干净清爽好认！
            </p>
          </div>
        </div>

        {/* View Switch Buttons */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
          <button
            onClick={() => {
              soundCtrl.playTap();
              setFloorViewMode('all');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              floorViewMode === 'all'
                ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Floors (全楼总览)</span>
          </button>

          <button
            onClick={() => {
              handleSpeakFloor('third floor');
              setFloorViewMode('3F');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              floorViewMode === '3F'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-indigo-700 hover:bg-indigo-50'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            <span>Focus: 3F Third Floor (单看三楼)</span>
          </button>

          <button
            onClick={() => {
              handleSpeakFloor('second floor');
              setFloorViewMode('2F');
            }}
            className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer flex items-center gap-1.5 ${
              floorViewMode === '2F'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'text-rose-700 hover:bg-rose-50'
            }`}
          >
            <Shirt className="w-3.5 h-3.5" />
            <span>Focus: 2F Second Floor (单看二楼)</span>
          </button>
        </div>
      </div>

      {/* Main Building Frame: Clean, Light, Vector-Based Cute Architectural Cross-Section */}
      <div
        onClick={onMissClick}
        className="w-full bg-white rounded-3xl border-4 border-amber-300 shadow-xl overflow-hidden relative flex flex-col md:flex-row"
      >
        {/* ========================================================
            LEFT COLUMN: Clear Vertical Elevator Shaft (立面电梯柱)
            Shows the exact vertical order: 3F is TOP, 2F is MIDDLE, 1F is BOTTOM
            ======================================================== */}
        <div className="w-full md:w-36 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white p-3 flex md:flex-col justify-between items-center border-b-4 md:border-b-0 md:border-r-4 border-amber-300 shrink-0 gap-2">
          {/* Top Title */}
          <div className="hidden md:flex flex-col items-center text-center pb-2 border-b border-slate-700 w-full">
            <span className="text-xl">🛗</span>
            <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
              ELEVATOR
            </span>
            <span className="text-[9px] text-slate-400">楼层立柱</span>
          </div>

          {/* 3F Button & Indicator */}
          <button
            onClick={() => {
              handleSpeakFloor('third floor');
              setFloorViewMode(floorViewMode === '3F' ? 'all' : '3F');
            }}
            className={`w-full p-2.5 rounded-2xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer group ${
              floorViewMode === '3F' || floorViewMode === 'all'
                ? 'bg-indigo-600 text-white shadow-lg ring-2 ring-indigo-400/60 border-indigo-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-amber-300 tracking-tight">3F</span>
              <Volume2 className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </div>
            <span className="text-[11px] font-black tracking-wide uppercase">
              Third Floor
            </span>
            <span className="text-[10px] text-indigo-200 font-bold">三楼 (放映厅)</span>
            <span className="text-[9px] bg-indigo-950/80 text-amber-300 px-1.5 py-0.5 rounded-full mt-1 font-bold">
              🎬 film
            </span>
          </button>

          {/* Vertical Link Arrow */}
          <div className="hidden md:flex flex-col items-center opacity-50">
            <div className="w-0.5 h-5 bg-slate-400"></div>
            <span className="text-[10px] text-slate-400 font-bold">▼</span>
          </div>

          {/* 2F Button & Indicator */}
          <button
            onClick={() => {
              handleSpeakFloor('second floor');
              setFloorViewMode(floorViewMode === '2F' ? 'all' : '2F');
            }}
            className={`w-full p-2.5 rounded-2xl flex flex-col items-center justify-center border-2 transition-all cursor-pointer group ${
              floorViewMode === '2F' || floorViewMode === 'all'
                ? 'bg-rose-600 text-white shadow-lg ring-2 ring-rose-400/60 border-rose-300'
                : 'bg-slate-800/80 border-slate-700 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <div className="flex items-center gap-1.5">
              <span className="text-2xl font-black text-amber-300 tracking-tight">2F</span>
              <Volume2 className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
            </div>
            <span className="text-[11px] font-black tracking-wide uppercase">
              Second Floor
            </span>
            <span className="text-[10px] text-rose-200 font-bold">二楼 (戏服区)</span>
            <span className="text-[9px] bg-rose-950/80 text-amber-300 px-1.5 py-0.5 rounded-full mt-1 font-bold">
              👗 costume
            </span>
          </button>

          {/* Vertical Link Arrow */}
          <div className="hidden md:flex flex-col items-center opacity-50">
            <div className="w-0.5 h-5 bg-slate-400"></div>
            <span className="text-[10px] text-slate-400 font-bold">▼</span>
          </div>

          {/* 1F Ground Floor Indicator */}
          <div className="w-full p-2 rounded-xl bg-slate-800/60 border border-slate-700 text-slate-400 flex flex-col items-center text-center">
            <span className="text-xs font-black text-slate-300">1F Lobby</span>
            <span className="text-[9px]">一楼迎宾大厅</span>
          </div>
        </div>

        {/* ========================================================
            RIGHT AREA: Clean, Bright, Storybook Vector Rooms
            Ultra-fast, zero-broken images, easy for kids to distinguish!
            ======================================================== */}
        <div className="flex-1 flex flex-col bg-slate-50">
          {/* ======================================================
              FLOOR 3: THIRD FLOOR (三楼 · 放映与胶片)
              ====================================================== */}
          {(floorViewMode === 'all' || floorViewMode === '3F') && (
            <div className="relative border-b-6 border-amber-900/30 bg-indigo-50/50 flex flex-col">
              {/* Floor Distinct Header Banner */}
              <div
                onClick={() => handleSpeakFloor('third floor')}
                className="bg-indigo-600 text-white px-4 py-2 flex items-center justify-between border-b-2 border-indigo-700 cursor-pointer hover:bg-indigo-700 transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-indigo-950 font-black flex items-center justify-center text-base shadow-xs">
                    3F
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-black tracking-wide uppercase text-white">
                        The Third Floor (三楼 · 电影放映层)
                      </span>
                      <span className="text-xs bg-indigo-900/60 px-2 py-0.5 rounded-full text-amber-300 font-bold hidden sm:inline">
                        Top Floor · 楼上
                      </span>
                    </div>
                    <p className="text-[11px] text-indigo-100">
                      Movie Cinema Room &amp; Film Editing Studio · 胶片在这里播放！
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeakFloor('third floor');
                  }}
                  className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>"third floor"</span>
                </button>
              </div>

              {/* 3F Clean Vector Rooms Container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 p-3 sm:p-5 gap-4 min-h-[220px]">
                {thirdFloorRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`rounded-2xl border-2 ${room.themeColor} p-4 flex flex-col justify-between relative shadow-xs min-h-[190px]`}
                  >
                    {/* Room Header */}
                    <div className="flex items-center justify-between border-b border-indigo-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{room.icon}</span>
                        <div>
                          <h4 className="text-sm font-extrabold text-indigo-950">{room.name}</h4>
                          <span className="text-[11px] text-indigo-700 font-semibold">{room.nameZh}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-white text-indigo-700 border border-indigo-200">
                        3F
                      </span>
                    </div>

                    {/* Room Interior Vector Prop Graphics & Hiding Spots */}
                    <div className="relative flex-1 my-3 flex items-center justify-around min-h-[100px]">
                      {room.spots.map((spot) => {
                        const activeItem = activeItems.find((i) => i.spotId === spot.id);
                        const isDistractor = distractorSpotId === spot.id;

                        return (
                          <div key={spot.id} className="flex flex-col items-center relative">
                            {/* Target Item: Costume or Film */}
                            {activeItem ? (
                              <button
                                onClick={(e) => handleItemClick(e, activeItem)}
                                className="group cursor-pointer transform hover:scale-125 active:scale-95 transition-all z-20 flex flex-col items-center"
                                title={`Click to find ${activeItem.type}!`}
                              >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 bg-white border-3 border-amber-400 shadow-xl ring-4 ring-amber-300/80 animate-gentle-bounce flex items-center justify-center">
                                  {activeItem.type === 'costume' ? (
                                    <CostumeVector className="w-full h-full" />
                                  ) : (
                                    <FilmVector className="w-full h-full" />
                                  )}
                                </div>
                                <div className="bg-rose-500 text-white font-black text-[11px] px-2 py-0.5 rounded-full shadow-md mt-1 animate-pulse border border-white">
                                  Tap {activeItem.type}!
                                </div>
                              </button>
                            ) : isDistractor ? (
                              <div className="w-10 h-10 rounded-full bg-amber-200 border-2 border-amber-400 text-amber-800 text-base flex items-center justify-center shadow-xs animate-pulse">
                                ⭐
                              </div>
                            ) : (
                              /* Clean Furniture Prop Base */
                              <div className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
                                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-indigo-200 flex items-center justify-center text-2xl shadow-xs">
                                  {spot.containerType === 'projector' && '📽️'}
                                  {spot.containerType === 'stage' && '🎬'}
                                  {spot.containerType === 'desk' && '🖥️'}
                                  {spot.containerType === 'shelf' && '📼'}
                                  {spot.containerType === 'chest' && '🍿'}
                                </div>
                                <span className="text-[10px] font-bold text-indigo-900 mt-1">
                                  {spot.spotNameZh}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-[10px] font-semibold text-indigo-600/80 border-t border-indigo-200/60 pt-1 flex justify-between">
                      <span>{room.decor}</span>
                      <span>The 3rd Floor</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================
              STAIRS & CONCRETE BEAM SEPARATOR (清晰分界楼层横梁)
              ====================================================== */}
          {floorViewMode === 'all' && (
            <div className="bg-amber-900 py-2 px-6 text-amber-100 flex items-center justify-between border-y-3 border-amber-950 shadow-inner text-xs font-bold">
              <div className="flex items-center gap-2">
                <span className="text-base">🪜</span>
                <span>Stairs &amp; Floor Slab (楼层分界实木横梁)</span>
                <span className="text-[10px] text-amber-300 font-normal">
                  ▲ Up to 3F (上三楼) · ▼ Down to 2F (下二楼)
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <span className="bg-indigo-900 text-amber-300 px-2 py-0.5 rounded font-black">
                  3F (Third Floor)
                </span>
                <span className="text-amber-400 font-bold">↕</span>
                <span className="bg-rose-900 text-amber-300 px-2 py-0.5 rounded font-black">
                  2F (Second Floor)
                </span>
              </div>
            </div>
          )}

          {/* ======================================================
              FLOOR 2: SECOND FLOOR (二楼 · 戏剧与戏服)
              ====================================================== */}
          {(floorViewMode === 'all' || floorViewMode === '2F') && (
            <div className="relative border-b-6 border-amber-900/30 bg-rose-50/50 flex flex-col">
              {/* Floor Distinct Header Banner */}
              <div
                onClick={() => handleSpeakFloor('second floor')}
                className="bg-rose-600 text-white px-4 py-2 flex items-center justify-between border-b-2 border-rose-700 cursor-pointer hover:bg-rose-700 transition-colors shadow-xs"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-400 text-rose-950 font-black flex items-center justify-center text-base shadow-xs">
                    2F
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base sm:text-lg font-black tracking-wide uppercase text-white">
                        The Second Floor (二楼 · 戏剧戏服层)
                      </span>
                      <span className="text-xs bg-rose-900/60 px-2 py-0.5 rounded-full text-amber-300 font-bold hidden sm:inline">
                        Middle Floor · 楼中
                      </span>
                    </div>
                    <p className="text-[11px] text-rose-100">
                      Drama Theater Stage &amp; Costume Wardrobe · 华丽戏服在这里！
                    </p>
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeakFloor('second floor');
                  }}
                  className="px-3 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white text-xs font-bold flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>"second floor"</span>
                </button>
              </div>

              {/* 2F Clean Vector Rooms Container */}
              <div className="grid grid-cols-1 sm:grid-cols-2 p-3 sm:p-5 gap-4 min-h-[220px]">
                {secondFloorRooms.map((room) => (
                  <div
                    key={room.id}
                    className={`rounded-2xl border-2 ${room.themeColor} p-4 flex flex-col justify-between relative shadow-xs min-h-[190px]`}
                  >
                    {/* Room Header */}
                    <div className="flex items-center justify-between border-b border-rose-200 pb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{room.icon}</span>
                        <div>
                          <h4 className="text-sm font-extrabold text-rose-950">{room.name}</h4>
                          <span className="text-[11px] text-rose-700 font-semibold">{room.nameZh}</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-white text-rose-700 border border-rose-200">
                        2F
                      </span>
                    </div>

                    {/* Room Interior Vector Prop Graphics & Hiding Spots */}
                    <div className="relative flex-1 my-3 flex items-center justify-around min-h-[100px]">
                      {room.spots.map((spot) => {
                        const activeItem = activeItems.find((i) => i.spotId === spot.id);
                        const isDistractor = distractorSpotId === spot.id;

                        return (
                          <div key={spot.id} className="flex flex-col items-center relative">
                            {/* Target Item: Costume or Film */}
                            {activeItem ? (
                              <button
                                onClick={(e) => handleItemClick(e, activeItem)}
                                className="group cursor-pointer transform hover:scale-125 active:scale-95 transition-all z-20 flex flex-col items-center"
                                title={`Click to find ${activeItem.type}!`}
                              >
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-2 bg-white border-3 border-amber-400 shadow-xl ring-4 ring-amber-300/80 animate-gentle-bounce flex items-center justify-center">
                                  {activeItem.type === 'costume' ? (
                                    <CostumeVector className="w-full h-full" />
                                  ) : (
                                    <FilmVector className="w-full h-full" />
                                  )}
                                </div>
                                <div className="bg-amber-500 text-white font-black text-[11px] px-2 py-0.5 rounded-full shadow-md mt-1 animate-pulse border border-white">
                                  Tap {activeItem.type}!
                                </div>
                              </button>
                            ) : isDistractor ? (
                              <div className="w-10 h-10 rounded-full bg-rose-200 border-2 border-rose-400 text-rose-800 text-base flex items-center justify-center shadow-xs animate-pulse">
                                ⭐
                              </div>
                            ) : (
                              /* Clean Furniture Prop Base */
                              <div className="flex flex-col items-center opacity-70 hover:opacity-100 transition-opacity">
                                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-rose-200 flex items-center justify-center text-2xl shadow-xs">
                                  {spot.containerType === 'stage' && '🎭'}
                                  {spot.containerType === 'curtain' && '🎪'}
                                  {spot.containerType === 'wardrobe' && '🚪'}
                                  {spot.containerType === 'shelf' && '🧥'}
                                  {spot.containerType === 'desk' && '🪞'}
                                </div>
                                <span className="text-[10px] font-bold text-rose-900 mt-1">
                                  {spot.spotNameZh}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-[10px] font-semibold text-rose-600/80 border-t border-rose-200/60 pt-1 flex justify-between">
                      <span>{room.decor}</span>
                      <span>The 2nd Floor</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ======================================================
              FLOOR 1: GROUND FLOOR LOBBY (一楼大厅底座)
              ====================================================== */}
          <div className="bg-amber-100/80 px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t-4 border-amber-300">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl p-1 bg-white border-2 border-amber-400 shadow-xs shrink-0">
                <DetectiveFoxVector className="w-full h-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-amber-900 bg-amber-300 px-2 py-0.5 rounded shadow-xs">
                    1F First Floor Lobby (一楼大厅)
                  </span>
                  <span className="text-xs text-slate-700 font-bold">
                    Detective Fox's Station
                  </span>
                </div>
                <p className="text-xs text-slate-600 mt-0.5">
                  "Look! <strong className="text-indigo-800">3F (third floor)</strong> is top with film &amp; cinema. <strong className="text-rose-800">2F (second floor)</strong> is middle with costume &amp; theater!"
                </p>
              </div>
            </div>

            {/* Quick Floor Compare Pill */}
            <div className="flex items-center gap-2 text-xs font-bold shrink-0">
              <button
                onClick={() => handleSpeakFloor('third floor')}
                className="px-3 py-1.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 transition-colors cursor-pointer shadow-xs flex items-center gap-1"
              >
                <span>3F: Third Floor (三楼)</span>
                <Volume2 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => handleSpeakFloor('second floor')}
                className="px-3 py-1.5 rounded-xl bg-rose-600 text-white hover:bg-rose-700 transition-colors cursor-pointer shadow-xs flex items-center gap-1"
              >
                <span>2F: Second Floor (二楼)</span>
                <Volume2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
