<script>
  // 현재 사용 중인 색상들만 테스트
  const testColors = [
    { name: 'Red', classes: ['bg-red-50', 'bg-red-100', 'bg-red-200', 'bg-red-300', 'bg-red-400', 'bg-red-500', 'bg-red-600', 'bg-red-700', 'bg-red-800', 'bg-red-900'] },
    { name: 'Blue', classes: ['bg-blue-50', 'bg-blue-100', 'bg-blue-200', 'bg-blue-300', 'bg-blue-400', 'bg-blue-500', 'bg-blue-600', 'bg-blue-700', 'bg-blue-800', 'bg-blue-900'] },
    { name: 'Green', classes: ['bg-green-50', 'bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-400', 'bg-green-500', 'bg-green-600', 'bg-green-700', 'bg-green-800', 'bg-green-900'] },
    { name: 'Gray', classes: ['bg-gray-50', 'bg-gray-100', 'bg-gray-200', 'bg-gray-300', 'bg-gray-400', 'bg-gray-500', 'bg-gray-600', 'bg-gray-700', 'bg-gray-800', 'bg-gray-900'] },
    { name: 'Yellow', classes: ['bg-yellow-50', 'bg-yellow-100', 'bg-yellow-200', 'bg-yellow-300', 'bg-yellow-400', 'bg-yellow-500', 'bg-yellow-600', 'bg-yellow-700', 'bg-yellow-800', 'bg-yellow-900'] },
    { name: 'Purple', classes: ['bg-purple-50', 'bg-purple-100', 'bg-purple-200', 'bg-purple-300', 'bg-purple-400', 'bg-purple-500', 'bg-purple-600', 'bg-purple-700', 'bg-purple-800', 'bg-purple-900'] }
  ];

  const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900'];
</script>

<div class="p-8">
  <h1 class="text-4xl font-bold mb-8 text-gray-900">Tailwind CSS 색상 팔레트 테스트</h1>
  
  <p class="text-lg text-gray-600 mb-8">
    모든 기본 Tailwind 색상이 정상적으로 렌더링되는지 확인하는 페이지입니다.
  </p>

  <div class="space-y-8">
    {#each testColors as colorGroup}
      <div class="bg-white rounded-lg shadow-sm border p-6">
        <h2 class="text-2xl font-semibold mb-4 text-gray-800">{colorGroup.name}</h2>
        
        <div class="grid grid-cols-10 gap-2">
          {#each colorGroup.classes as colorClass, index}
            <div class="text-center">
              <div 
                class="w-16 h-16 rounded-lg shadow-sm mb-2 {colorClass}"
                title="{colorClass}"
              ></div>
              <span class="text-xs text-gray-600">{shades[index]}</span>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>

  <!-- 추가 테스트: 특별 색상들 -->
  <div class="mt-12 bg-white rounded-lg shadow-sm border p-6">
    <h2 class="text-2xl font-semibold mb-4 text-gray-800">특별 색상 테스트</h2>
    
    <div class="grid grid-cols-4 gap-4">
      <div class="text-center">
        <div class="w-16 h-16 bg-black rounded-lg mb-2"></div>
        <span class="text-sm">black</span>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-white border rounded-lg mb-2"></div>
        <span class="text-sm">white</span>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-transparent border-2 border-dashed border-gray-300 rounded-lg mb-2"></div>
        <span class="text-sm">transparent</span>
      </div>
      
      <div class="text-center">
        <div class="w-16 h-16 bg-current text-blue-500 rounded-lg mb-2"></div>
        <span class="text-sm">current</span>
      </div>
    </div>
  </div>

  <!-- 네비게이션 -->
  <div class="mt-12 text-center space-x-4">
    <a href="/test-colors/custom" class="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
      🎭 커스텀 색상 테스트
    </a>
    <a href="/" class="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
      홈으로 돌아가기
    </a>
  </div>
</div>