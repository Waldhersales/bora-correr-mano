'use client'

import { useState, useEffect } from 'react'
import { Play, Camera, TrendingUp, Calendar, Store, Users, Settings, MapPin, Timer, Zap, Heart, MessageCircle, Share2, Plus, User, Edit3, Trophy, Target, Shirt, Palette } from 'lucide-react'

type TeamColor = 'blue' | 'red' | 'yellow' | 'green'
type Gender = 'male' | 'female'

interface UserProfile {
  name: string
  bio: string
  teamColor: TeamColor
  avatar: {
    gender: Gender
    hair: number
    outfit: number
    accessories: number
  }
  stats: {
    totalKm: number
    totalRuns: number
    weeklyKm: number
  }
}

interface Post {
  id: number
  user: string
  avatar: string
  content: string
  image?: string
  likes: number
  comments: number
  teamColor: TeamColor
  time: string
  type: 'run' | 'photo' | 'achievement'
}

const teamColors = {
  blue: { bg: 'bg-blue-500', text: 'text-blue-500', border: 'border-blue-500', light: 'bg-blue-50' },
  red: { bg: 'bg-red-500', text: 'text-red-500', border: 'border-red-500', light: 'bg-red-50' },
  yellow: { bg: 'bg-yellow-500', text: 'text-yellow-500', border: 'border-yellow-500', light: 'bg-yellow-50' },
  green: { bg: 'bg-green-500', text: 'text-green-500', border: 'border-green-500', light: 'bg-green-50' }
}

const hairStyles = {
  male: ['Curto', 'Moicano', 'Raspado', 'Ondulado', 'Liso'],
  female: ['Longo', 'Bob', 'Cacheado', 'Rabo de cavalo', 'Franja']
}

const outfits = {
  male: ['Regata básica', 'Camiseta dry-fit', 'Tank top', 'Regata premium', 'Camiseta térmica'],
  female: ['Top esportivo', 'Regata fitness', 'Cropped', 'Top premium', 'Blusa térmica']
}

const accessories = ['Nenhum', 'Óculos', 'Boné', 'Fone', 'Relógio', 'Pulseira']

export default function BoraCorrerMano() {
  const [currentScreen, setCurrentScreen] = useState<'onboarding' | 'feed' | 'run' | 'profile' | 'avatar'>('onboarding')
  const [isRunning, setIsRunning] = useState(false)
  const [runTime, setRunTime] = useState(0)
  const [distance, setDistance] = useState(0)
  const [user, setUser] = useState<UserProfile>({
    name: '',
    bio: '',
    teamColor: 'blue',
    avatar: {
      gender: 'male',
      hair: 0,
      outfit: 0,
      accessories: 0
    },
    stats: {
      totalKm: 0,
      totalRuns: 0,
      weeklyKm: 0
    }
  })

  const [posts] = useState<Post[]>([
    {
      id: 1,
      user: 'Carlos Silva',
      avatar: '👨‍🦱',
      content: 'Acabei de completar 5km no Parque do Mindú! 🏃‍♂️',
      image: '/api/placeholder/300/200',
      likes: 24,
      comments: 8,
      teamColor: 'blue',
      time: '2h',
      type: 'run'
    },
    {
      id: 2,
      user: 'Ana Costa',
      avatar: '👩‍🦰',
      content: 'Nova conquista desbloqueada: 100km no mês! 🏆',
      likes: 45,
      comments: 12,
      teamColor: 'red',
      time: '4h',
      type: 'achievement'
    },
    {
      id: 3,
      user: 'Suplementos Manaus',
      avatar: '🏪',
      content: '🔥 PROMOÇÃO: 30% OFF em Whey Protein! Válido até domingo.',
      likes: 67,
      comments: 23,
      teamColor: 'green',
      time: '6h',
      type: 'photo'
    }
  ])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setRunTime(prev => prev + 1)
        setDistance(prev => prev + 0.01) // Simula movimento
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const OnboardingScreen = () => (
    <div className="min-h-screen bg-black text-white p-6 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto">
            <div className="text-black text-2xl font-bold transform -skew-x-12">🏃‍♂️</div>
          </div>
          <h1 className="text-4xl font-bold transform -skew-x-6">Bora correr mano</h1>
          <p className="text-gray-300">Transforme cada corrida em uma aventura social!</p>
        </div>

        <div className="w-full max-w-sm space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Seu nome</label>
            <input
              type="text"
              value={user.name}
              onChange={(e) => setUser(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 text-white"
              placeholder="Digite seu nome"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Escolha seu time</label>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(teamColors).map(([color, styles]) => (
                <button
                  key={color}
                  onClick={() => setUser(prev => ({ ...prev, teamColor: color as TeamColor }))}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    user.teamColor === color 
                      ? `${styles.bg} border-white` 
                      : `bg-gray-800 ${styles.border} border-opacity-50`
                  }`}
                >
                  <div className={`w-8 h-8 ${styles.bg} rounded-full mx-auto mb-2`}></div>
                  <span className="text-sm font-medium capitalize">{color === 'blue' ? 'Azul' : color === 'red' ? 'Vermelho' : color === 'yellow' ? 'Amarelo' : 'Verde'}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen('avatar')}
            className="w-full bg-white text-black p-3 rounded-lg font-bold hover:bg-gray-200 transition-colors"
          >
            Personalizar Avatar
          </button>
        </div>
      </div>
    </div>
  )

  const AvatarScreen = () => (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button onClick={() => setCurrentScreen('onboarding')} className="text-gray-400">
            ← Voltar
          </button>
          <h2 className="text-xl font-bold">Criar Avatar</h2>
          <div></div>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 mb-6">
          <div className="w-32 h-32 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center">
            <div className="text-4xl">
              {user.avatar.gender === 'male' ? '👨' : '👩'}
            </div>
          </div>
          <p className="text-center text-gray-300">Preview do Avatar</p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">Gênero</label>
            <div className="grid grid-cols-2 gap-3">
              {(['male', 'female'] as Gender[]).map((gender) => (
                <button
                  key={gender}
                  onClick={() => setUser(prev => ({ 
                    ...prev, 
                    avatar: { ...prev.avatar, gender, hair: 0, outfit: 0 }
                  }))}
                  className={`p-3 rounded-lg border transition-all ${
                    user.avatar.gender === gender 
                      ? 'bg-blue-500 border-blue-400' 
                      : 'bg-gray-800 border-gray-700'
                  }`}
                >
                  {gender === 'male' ? '👨 Masculino' : '👩 Feminino'}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Cabelo</label>
            <div className="grid grid-cols-1 gap-2">
              {hairStyles[user.avatar.gender].map((style, index) => (
                <button
                  key={index}
                  onClick={() => setUser(prev => ({ 
                    ...prev, 
                    avatar: { ...prev.avatar, hair: index }
                  }))}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    user.avatar.hair === index 
                      ? 'bg-blue-500 border-blue-400' 
                      : 'bg-gray-800 border-gray-700'
                  }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Roupa</label>
            <div className="grid grid-cols-1 gap-2">
              {outfits[user.avatar.gender].map((outfit, index) => (
                <button
                  key={index}
                  onClick={() => setUser(prev => ({ 
                    ...prev, 
                    avatar: { ...prev.avatar, outfit: index }
                  }))}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    user.avatar.outfit === index 
                      ? 'bg-blue-500 border-blue-400' 
                      : 'bg-gray-800 border-gray-700'
                  }`}
                >
                  {outfit}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Acessórios</label>
            <div className="grid grid-cols-2 gap-2">
              {accessories.map((accessory, index) => (
                <button
                  key={index}
                  onClick={() => setUser(prev => ({ 
                    ...prev, 
                    avatar: { ...prev.avatar, accessories: index }
                  }))}
                  className={`p-3 rounded-lg border text-left transition-all ${
                    user.avatar.accessories === index 
                      ? 'bg-blue-500 border-blue-400' 
                      : 'bg-gray-800 border-gray-700'
                  }`}
                >
                  {accessory}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => setCurrentScreen('feed')}
            className="w-full bg-white text-black p-4 rounded-lg font-bold hover:bg-gray-200 transition-colors"
          >
            Começar a Correr! 🏃‍♂️
          </button>
        </div>
      </div>
    </div>
  )

  const FeedScreen = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">🏃</span>
            </div>
            <h1 className="text-xl font-bold">Bora correr mano</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 ${teamColors[user.teamColor].bg} rounded-full`}></div>
            <span className="text-sm font-medium">{user.name || 'Usuário'}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-white border-b">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => setCurrentScreen('run')}
            className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4 rounded-xl flex items-center justify-center space-x-2 font-bold"
          >
            <Play className="w-5 h-5" />
            <span>Iniciar Corrida</span>
          </button>
          <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-xl flex items-center justify-center space-x-2 font-bold">
            <Camera className="w-5 h-5" />
            <span>Foto + Overlay</span>
          </button>
        </div>
        
        <div className="grid grid-cols-4 gap-3 mt-3">
          <button 
            onClick={() => setCurrentScreen('profile')}
            className="bg-gray-100 p-3 rounded-lg flex flex-col items-center space-y-1"
          >
            <TrendingUp className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Progresso</span>
          </button>
          <button className="bg-gray-100 p-3 rounded-lg flex flex-col items-center space-y-1">
            <Calendar className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Eventos</span>
          </button>
          <button className="bg-gray-100 p-3 rounded-lg flex flex-col items-center space-y-1">
            <Store className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Lojas</span>
          </button>
          <button className="bg-gray-100 p-3 rounded-lg flex flex-col items-center space-y-1">
            <Users className="w-5 h-5 text-gray-600" />
            <span className="text-xs text-gray-600">Profissionais</span>
          </button>
        </div>
      </div>

      {/* Team Stats */}
      <div className="p-4 bg-white border-b">
        <h3 className="font-bold mb-3">🏆 Ranking Semanal - Manaus</h3>
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(teamColors).map(([color, styles], index) => (
            <div key={color} className={`${styles.light} p-3 rounded-lg border ${styles.border}`}>
              <div className={`w-4 h-4 ${styles.bg} rounded-full mb-1`}></div>
              <div className="text-xs font-medium">{['1º', '2º', '3º', '4º'][index]}</div>
              <div className="text-xs text-gray-600">{Math.floor(Math.random() * 500 + 200)}km</div>
            </div>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="space-y-4 p-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl p-4 border">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span>{post.avatar}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-bold text-sm">{post.user}</h4>
                  <div className={`w-3 h-3 ${teamColors[post.teamColor].bg} rounded-full`}></div>
                </div>
                <p className="text-xs text-gray-500">{post.time}</p>
              </div>
              {post.type === 'achievement' && <Trophy className="w-5 h-5 text-yellow-500" />}
            </div>
            
            <p className="text-sm mb-3">{post.content}</p>
            
            {post.image && (
              <div className="bg-gray-100 rounded-lg h-40 mb-3 flex items-center justify-center">
                <span className="text-gray-400">📸 Imagem do post</span>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-3 border-t">
              <button className="flex items-center space-x-1 text-gray-600">
                <Heart className="w-4 h-4" />
                <span className="text-sm">{post.likes}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600">
                <MessageCircle className="w-4 h-4" />
                <span className="text-sm">{post.comments}</span>
              </button>
              <button className="flex items-center space-x-1 text-gray-600">
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t">
        <div className="grid grid-cols-5 py-2">
          <button className="flex flex-col items-center py-2 text-blue-500">
            <div className="w-6 h-6 mb-1">🏠</div>
            <span className="text-xs">Feed</span>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-400">
            <MapPin className="w-6 h-6 mb-1" />
            <span className="text-xs">Mapa</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('run')}
            className="flex flex-col items-center py-2 text-gray-400"
          >
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-1">
              <Play className="w-6 h-6 text-white" />
            </div>
          </button>
          <button className="flex flex-col items-center py-2 text-gray-400">
            <MessageCircle className="w-6 h-6 mb-1" />
            <span className="text-xs">Chat IA</span>
          </button>
          <button 
            onClick={() => setCurrentScreen('profile')}
            className="flex flex-col items-center py-2 text-gray-400"
          >
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">Perfil</span>
          </button>
        </div>
      </div>
    </div>
  )

  const RunScreen = () => (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <button onClick={() => setCurrentScreen('feed')} className="text-gray-400">
          ← Voltar
        </button>
        <h2 className="text-lg font-bold">Corrida Ativa</h2>
        <button className="text-gray-400">
          <Settings className="w-6 h-6" />
        </button>
      </div>

      {/* Map Area */}
      <div className="h-64 bg-gray-800 mx-4 rounded-xl mb-6 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-green-500 mx-auto mb-2" />
          <p className="text-gray-300">Mapa GPS - Manaus</p>
          <p className="text-sm text-gray-500">Rastreamento em tempo real</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 px-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <Timer className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{formatTime(runTime)}</div>
          <div className="text-sm text-gray-400">Tempo</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{distance.toFixed(2)}</div>
          <div className="text-sm text-gray-400">km</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 text-center">
          <Zap className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold">{Math.floor(distance * 65)}</div>
          <div className="text-sm text-gray-400">kcal</div>
        </div>
      </div>

      {/* Team Progress */}
      <div className="px-4 mb-8">
        <div className={`${teamColors[user.teamColor].light} rounded-xl p-4 border ${teamColors[user.teamColor].border}`}>
          <div className="flex items-center space-x-3 mb-2">
            <div className={`w-6 h-6 ${teamColors[user.teamColor].bg} rounded-full`}></div>
            <span className="font-bold">Time {user.teamColor === 'blue' ? 'Azul' : user.teamColor === 'red' ? 'Vermelho' : user.teamColor === 'yellow' ? 'Amarelo' : 'Verde'}</span>
          </div>
          <p className="text-sm text-gray-600">Seus km contam para o ranking do time!</p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-4 space-y-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`w-full p-4 rounded-xl font-bold text-lg ${
            isRunning 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-green-500 hover:bg-green-600'
          } transition-colors`}
        >
          {isRunning ? '⏸️ Pausar Corrida' : '▶️ Iniciar Corrida'}
        </button>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="bg-gray-800 p-3 rounded-xl flex items-center justify-center space-x-2">
            <Camera className="w-5 h-5" />
            <span>Foto + Overlay</span>
          </button>
          <button className="bg-gray-800 p-3 rounded-xl flex items-center justify-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Compartilhar</span>
          </button>
        </div>
      </div>

      {/* Bottom padding for safe area */}
      <div className="h-20"></div>
    </div>
  )

  const ProfileScreen = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => setCurrentScreen('feed')} className="text-gray-400">
            ← Voltar
          </button>
          <h2 className="text-lg font-bold">Meu Perfil</h2>
          <button onClick={() => setCurrentScreen('avatar')}>
            <Edit3 className="w-6 h-6 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Profile Info */}
      <div className="bg-white p-6 border-b">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-2xl">{user.avatar.gender === 'male' ? '👨' : '👩'}</span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-bold">{user.name || 'Seu Nome'}</h3>
            <div className="flex items-center space-x-2 mt-1">
              <div className={`w-4 h-4 ${teamColors[user.teamColor].bg} rounded-full`}></div>
              <span className="text-sm text-gray-600">
                Time {user.teamColor === 'blue' ? 'Azul' : user.teamColor === 'red' ? 'Vermelho' : user.teamColor === 'yellow' ? 'Amarelo' : 'Verde'}
              </span>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">{user.stats.totalKm}</div>
            <div className="text-sm text-gray-600">Total km</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-500">{user.stats.totalRuns}</div>
            <div className="text-sm text-gray-600">Corridas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">{user.stats.weeklyKm}</div>
            <div className="text-sm text-gray-600">Esta semana</div>
          </div>
        </div>
      </div>

      {/* Avatar Customization */}
      <div className="bg-white p-6 border-b">
        <h4 className="font-bold mb-4">Personalização do Avatar</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <Shirt className="w-6 h-6 text-gray-600 mb-2" />
            <div className="text-sm font-medium">Roupa</div>
            <div className="text-xs text-gray-600">{outfits[user.avatar.gender][user.avatar.outfit]}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <Palette className="w-6 h-6 text-gray-600 mb-2" />
            <div className="text-sm font-medium">Cabelo</div>
            <div className="text-xs text-gray-600">{hairStyles[user.avatar.gender][user.avatar.hair]}</div>
          </div>
        </div>
        <button 
          onClick={() => setCurrentScreen('avatar')}
          className="w-full mt-4 bg-blue-500 text-white p-3 rounded-lg font-medium"
        >
          Editar Avatar
        </button>
      </div>

      {/* Achievements */}
      <div className="bg-white p-6 border-b">
        <h4 className="font-bold mb-4">🏆 Conquistas</h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg text-center">
            <div className="text-2xl mb-1">🥇</div>
            <div className="text-xs font-medium">Primeira Corrida</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-center opacity-50">
            <div className="text-2xl mb-1">🏃‍♂️</div>
            <div className="text-xs font-medium">10km Total</div>
          </div>
          <div className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-center opacity-50">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xs font-medium">Velocista</div>
          </div>
        </div>
      </div>

      {/* Premium */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-6 m-4 rounded-xl">
        <h4 className="font-bold text-lg mb-2">🚀 Upgrade para Premium</h4>
        <p className="text-sm mb-4 opacity-90">Dietas personalizadas, treinos exclusivos e muito mais!</p>
        <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-bold">
          7 dias grátis
        </button>
      </div>

      <div className="h-20"></div>
    </div>
  )

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen">
      {currentScreen === 'onboarding' && <OnboardingScreen />}
      {currentScreen === 'avatar' && <AvatarScreen />}
      {currentScreen === 'feed' && <FeedScreen />}
      {currentScreen === 'run' && <RunScreen />}
      {currentScreen === 'profile' && <ProfileScreen />}
    </div>
  )
}